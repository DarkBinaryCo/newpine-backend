const { ResidentService } = require("../../../services");

// Utils
const { ApiUtil } = require("../../../utils");

/** Create a resident account for the current user */
const createResident = async (req, res, next) => {
  let insertData = req.body.data || {};

  // The resident created
  insertData.userId = req.userData.id;
  insertData.communityId = req.userData.communityId;

  //* Getting here means this is a valid co-resident request
  ApiUtil.attachErrorHandler(
    res,
    ResidentService.createResident(insertData, true).then((residentCreated) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully created resident",
        residentCreated,
        201
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = createResident;
