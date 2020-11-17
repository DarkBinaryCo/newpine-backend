const { ResidentService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Create a co-resident */
const createResident = async (req, res, next) => {
  let insertData = req.body.data || {};

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

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = createResident;
