// Config
const { USER_TYPE } = require("../../config/auth");
const { DEFAULT_COMMUNITY_ID } = require("../../seeders/config");

// Services
const { AuthService, UserService, PropertyService } = require("../../services");

// Utils
const { ApiUtil, FormatUtil } = require("../../utils");

/** Send an OTP the provided phone number */
const sendOtp = async (req, res, next) => {
  const { phone } = req.body.data;

  // Convert the phone number to international so that our SMS provider API is not angry
  const phoneInternational = FormatUtil.getPhoneInternationalFormat(phone);

  const userTypesAllowed = [USER_TYPE.RESIDENT, USER_TYPE.RESIDENT_REP];
  const typeOfUserToCreate = req.body.data.userType;

  // Check if the user already exists -> Allow them to signin if so
  let user = await UserService.getSingleUser({ phone: phoneInternational }, [
    "otp",
    "lastOtpSentAt",
  ]);

  // When no user type is specified, allow them to signup ~ defaults to resident
  const isValidUserType = typeOfUserToCreate
    ? userTypesAllowed.includes(parseInt(typeOfUserToCreate))
    : true;

  //
  try {
    if (!user) {
      // Don't allow creation of any other type of user that isn't explicitly allowed here and doesn't already have an account
      if (!isValidUserType) {
        throw new Error("Signup is not available for that account type");
      }

      const { host } = req.body;
      const communityFound = await PropertyService.getSingleCommunity({ host });
      //
      if (!communityFound) {
        throw new Error(
          `Community for the host "${host}" is currently unavailable. Kindly contact support of the error persists.`
        );
      }

      const communityId = communityFound?.id;
      const newUserData = { phone, communityId };

      //
      if (typeOfUserToCreate) {
        newUserData.userTypeId = typeOfUserToCreate;
      }

      // If the user does not exist ~ create them
      const newUser = await UserService.createUser(newUserData);
      user = newUser.dataValues;
    }
  } catch (err) {
    const apiResponse = ApiUtil.getError(err.message, err);
    return ApiUtil.printResponse(res, apiResponse);
  }

  //
  ApiUtil.attachErrorHandler(
    res,
    AuthService.sendOtp(user).then((response) => {
      const isOk = response.hasSent && !response.isWaiting;
      let message = isOk
        ? `Successfully sent OTP to ${phoneInternational}`
        : "Failed to send OTP";
      message = response.isWaiting
        ? "Failed: You need to wait before you can send another OTP request"
        : message;
      const statusCode = isOk ? 200 : 403;

      const apiResponseData = {
        phone,
        ...response,
      };

      const apiResponse = ApiUtil.getResponse(
        isOk,
        message,
        apiResponseData,
        statusCode
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = sendOtp;
