// Services
const { PropertyService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

//
const getPropertyGroups = (req, res, next) => {
  let filter = req.body.filter || {};

  ApiUtil.attachErrorHandler(
    res,
    PropertyService.getPropertyGroups(filter).then((propertyGroupsFound) => {
      let apiResponse;

      if (propertyGroupsFound) {
        apiResponse = ApiUtil.getResponse(
          true,
          "Successfully retrieved property groups",
          propertyGroupsFound
        );
      } else {
        apiResponse = ApiUtil.getResponse(
          false,
          "No property groups found",
          null
        );
      }

      ApiUtil.printResponse(res, apiResponse, next);
    })
  );
};

//* EXPORTS
module.exports = getPropertyGroups;
