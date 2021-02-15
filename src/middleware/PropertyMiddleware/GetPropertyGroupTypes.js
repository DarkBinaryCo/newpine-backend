// Services
const { PropertyService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

//
const getPropertyGroupTypes = (req, res, next) => {
  let filter = req.body.filter || {};

  ApiUtil.attachErrorHandler(
    res,
    PropertyService.getPropertyGroupTypes(filter).then(
      (propertyGroupTypesFound) => {
        let apiResponse;

        if (propertyGroupTypesFound) {
          apiResponse = ApiUtil.getResponse(
            true,
            "Successfully retrieved property group types",
            propertyGroupTypesFound
          );
        } else {
          apiResponse = ApiUtil.getResponse(
            false,
            "No property group types found",
            null
          );
        }

        ApiUtil.printResponse(res, apiResponse, next);
      }
    )
  );
};

//* EXPORTS
module.exports = getPropertyGroupTypes;
