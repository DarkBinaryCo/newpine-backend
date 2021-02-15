// Services
const { PropertyService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

//
const getProperties = (req, res, next) => {
  let filter = req.body.filter || {};

  ApiUtil.attachErrorHandler(
    res,
    PropertyService.getProperties(filter).then((propertiesFound) => {
      let apiResponse;

      if (propertiesFound) {
        apiResponse = ApiUtil.getResponse(
          true,
          "Successfully retrieved properties",
          propertiesFound
        );
      } else {
        apiResponse = ApiUtil.getResponse(false, "No properties found", null);
      }

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = getProperties;
