// Services
const { PropertyService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Update a community */
const updateCommunity = (req, res, _next) => {
  const filter = { id: req.params.communityId, ...req.body.filter };
  const updatedData = req.body.data || {};

  //
  ApiUtil.attachErrorHandler(
    res,
    PropertyService.updateCommunity(updatedData, filter).then((_) => {
      const apiResponse = ApiUtil.getResponse(
        true,
        "Successfully updated community"
      );

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = updateCommunity;
