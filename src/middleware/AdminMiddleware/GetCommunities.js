const _ = require("lodash");

// Services
const { PropertyService } = require("../../services");

// Utils
const { ApiUtil } = require("../../utils");

/** Get communities */
const getCommunities = (req, res, _next) => {
  const filter = { ...req.query.filter, ...req.body.filter };

  //
  ApiUtil.attachErrorHandler(
    res,
    PropertyService.getCommunities(filter).then((communities) => {
      const message = _.isEmpty(communities)
        ? "No communities found"
        : "Successfully retrieved communities";

      const apiResponse = ApiUtil.getResponse(true, message, communities);

      ApiUtil.printResponse(res, apiResponse);
    })
  );
};

//* EXPORTS
module.exports = getCommunities;
