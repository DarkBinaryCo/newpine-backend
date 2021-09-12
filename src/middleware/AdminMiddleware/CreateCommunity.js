// Services
const { PropertyService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Creates a community */
const createCommunity = (req, res, _next) => {
  let communityData = req.body.data || {};

  //
  ApiUtil.attachErrorHandler(
    res,
    PropertyService.createCommunity(communityData).then((communityAdded) => {
      let apiResponse = ApiUtil.getResponse(
        true,
        "Successfully added community",
        communityAdded,
        201
      );
      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = createCommunity;
