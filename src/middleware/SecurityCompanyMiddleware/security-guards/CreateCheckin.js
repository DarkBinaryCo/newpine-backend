//* This middleware MUST be called after PermissionMiddleware.SecurityGuardLoggedIn
const _ = require("lodash");
const { USER_TYPE } = require("../../../config/auth");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

// Services
const {
  SecurityCompanyService,
  ResidentService,
  UserService,
  VisitorService,
} = require("../../../services");

// Utils
const { ApiUtil, FormatUtil } = require("../../../utils");

/** Get the checkin API response object and return it given a set of parameters
 * @param {boolean} ok Whether the checkin was successful or not
 * @param {'resident' | 'visitor' | null} checkinType Whether a resident or visitor was the initiator of this checkin
 * @param {boolean} isCheckin If `true`, it is a checkin; otherwise(`false`) it is a checkout
 * @return {ApiReponse} An API response object with the
 */
const getCheckinResponse = (ok, checkinType, isCheckin) => {
  const messageAction = isCheckin ? "Check in" : "Check out";
  let message;

  if (checkinType) {
    // Sentence construction for the response message
    const messageStatus = ok ? "successful" : "failed";

    message = `${_.upperFirst(
      checkinType?.toLowerCase()
    )} ${messageAction} ${messageStatus}`;
  } else {
    message = `${_.upperFirst(
      messageAction
    )} failed. No records were found matching the criteria provided.`;
  }

  // Data to be returned as part of the API response
  const data = {
    type: checkinType,
    isCheckin,
  };

  const response = ApiUtil.getResponse(ok, message, data);

  return response;
};

// Vehicle checkin
const handleVehicleCheckin = async (
  isCheckin = true,
  numberplate,
  idNumber = null,
  securityGuardId
) => {
  //? Check resident vehicles - likely that someone in a vehicle is a resident
  // Check by numberplate
  const vehicleFilter = { numberplate: { [Op.like]: `%${numberplate}%` } };
  const vehicleFound = await ResidentService.getSingleVehicle(vehicleFilter);

  if (vehicleFound) {
    //* Checkin resident
    await SecurityCompanyService.createResidentCheckin(
      vehicleFound.residentId,
      securityGuardId,
      isCheckin
    );

    return getCheckinResponse(true, "resident", isCheckin, vehicleFound);
  } else if (idNumber) {
    //? No resident vehicle with the given numberplate was found
    // Find a user with the id provided
    const userFilter = {
      identificationNumber: idNumber,
      userTypeId: USER_TYPE.RESIDENT,
    };
    const userFound = await UserService.getSingleUser(userFilter);

    // A resident user account was found - check for the resident corresponding to the account
    if (userFound) {
      const residentFilter = { userId: userFound.id };

      //? This should always work since we only allow for paranoid/soft deletes of resident. Check Resident model for clarity.
      // Only way this would NOT work is if we manually hard deleted a resident from the database but left the user in
      const residentFound = await ResidentService.getSingleResident(
        residentFilter
      );

      //* Checkin resident
      await SecurityCompanyService.createResidentCheckin(
        residentFound.id,
        securityGuardId,
        isCheckin
      );

      return getCheckinResponse(true, "resident", isCheckin);
    }
  }

  //* Check visitor invitations
  const visitorFilter = {
    [Op.or]: [
      { identificationNumber: idNumber || "" },
      { vehicleNumberplate: numberplate },
    ],
    isActive: true, //? Only check for active invitations (aka, unused invitations)
  };

  const visitorInvitationFound =
    await VisitorService.getSingleVisitorInvitation(visitorFilter);

  if (visitorInvitationFound) {
    //* Checkin visitor
    SecurityCompanyService.createVisitorCheckin(
      visitorInvitationFound.id,
      securityGuardId,
      isCheckin,
      { propertyId: visitorInvitationFound.Resident.propertyId }
    );

    return getCheckinResponse(true, "visitor", isCheckin);
  }

  //? Getting here means neither a resident nor a visitor invitation matching the criteria specified was found
  return getCheckinResponse(false, null, isCheckin);
};

// Foot checkin
const handleFootCheckin = async (
  isCheckin = true,
  idMethod = "id",
  idNumber = null,
  securityGuardId
) => {
  // idMethod has to be one of these options to be considered valid
  const idOptions = ["id", "phone"];

  // If either the id method or id number have not been passed in or are invalid, no need to proceed
  if (!idOptions.includes(idMethod) || !idNumber) {
    const errorMessage =
      "Both the id method ('id' or 'phone') and the id number need to be provided for foot checkin to work.";

    return ApiUtil.getError(errorMessage, new Error(errorMessage));
  }

  //* Getting here means both the idMethod and idNumber have been set and the idMethod provided is valid (among our options)
  // Check visitors - likely that someone on foot is a visitor rather than a resident
  const visitorFilter = {
    [Op.or]: [{ phone: idNumber }, { identificationNumber: idNumber }],
    isActive: true,
  };

  const visitorInvitationFound =
    await VisitorService.getSingleVisitorInvitation(visitorFilter);

  if (visitorInvitationFound) {
    //* Checkin visitor
    SecurityCompanyService.createVisitorCheckin(
      visitorInvitationFound.id,
      securityGuardId,
      isCheckin,
      { propertyId: visitorInvitationFound.Resident.propertyId }
    );

    return getCheckinResponse(true, "visitor", isCheckin);
  }

  //? Getting here means no visitor invitation was found for the criteria provided
  // Check if there is a resident that meets the criteria
  const userFilter = {
    [Op.or]: [{ identificationNumber: idNumber }, { phone: idNumber }],
    userTypeId: USER_TYPE.RESIDENT,
  };
  const userFound = await UserService.getSingleUser(userFilter);

  // A resident user account was found - check for the resident corresponding to the account
  if (userFound) {
    const residentFilter = { userId: userFound.id };

    //? This should always work since we only allow for paranoid/soft deletes of resident. Check Resident model for clarity.
    // Only way this would NOT work is if we manually hard deleted a resident from the database but left the user in
    const residentFound = await ResidentService.getSingleResident(
      residentFilter
    );

    //* Checkin resident
    await SecurityCompanyService.createResidentCheckin(
      residentFound.id,
      securityGuardId,
      isCheckin
    );

    // Return a success response
    return getCheckinResponse(true, "resident", isCheckin);
  }

  return getCheckinResponse(false, null, isCheckin);
};

/** Create resident checkin */
const createCheckin = async (req, res, next) => {
  const currentSecurityGuard = req.securityGuardData;
  let { isCheckin, metadata, transportMode } = req.body.data || {};

  let apiResponse;

  try {
    if ((transportMode || "").toLowerCase() === "vehicle") {
      apiResponse = await handleVehicleCheckin(
        isCheckin,
        metadata.numberplate,
        metadata.idNumber,
        currentSecurityGuard.id
      );
    } else {
      const { idMethod } = metadata;
      let { idNumber } = metadata;

      //? If we are identifying the user via phone, convert the phone number to international format for db comparison
      // Db phone numbers are always* in international format
      if (idMethod === "phone") {
        idNumber = FormatUtil.getPhoneInternationalFormat(idNumber);
      }

      apiResponse = await handleFootCheckin(
        isCheckin,
        idMethod,
        idNumber,
        currentSecurityGuard.id
      );
    }

    // Print the API resonse and end this middleware's execution
    ApiUtil.printResponse(res, apiResponse);
  } catch (err) {
    console.error("[error]", err);

    apiResponse = ApiUtil.getError(
      "Something went wrong while trying to create a checkin/out",
      err
    );

    ApiUtil.printResponse(res, apiResponse);
  }
};

//* EXPORTS
module.exports = createCheckin;
