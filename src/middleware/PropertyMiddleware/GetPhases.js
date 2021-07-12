// Services
const { PropertyService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

//
const getPhases = (_, res, next) => {
  ApiUtil.attachErrorHandler(
    res,
    PropertyService.getPhases().then((phasesFound) => {
      let apiResponse;

      if (phasesFound) {
        apiResponse = ApiUtil.getResponse(
          true,
          "Successfully retrieved phases",
          phasesFound
        );
      } else {
        apiResponse = ApiUtil.getResponse(false, "No phases found", null);
      }

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = getPhases;
