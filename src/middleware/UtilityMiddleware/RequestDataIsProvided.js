// Utils
const { ApiUtil } = require("../../utils");

/** Ensures that the request data has been provided before moving on to the next middleware */
const requestDataIsProvided = (req, res, next) => {
  let requestData = req.body.data;

  // by first checking the requestData, we catch edge cases such as null being an object
  if (requestData && typeof requestData === "object") {
    // Request data was found & in a valid format ~ move on to the next middleware
    next();
  } else {
    // Request data was not found/invalid request data format
    let err = new Error(
      "Error: I was expecting a `data` object as part of the request body but I could not find it.Try adding an object with the key of `data` then try again."
    );
    let apiResponse = ApiUtil.getError(err.message, err, 400);

    ApiUtil.printResponse(res, apiResponse, next);
  }
};

//* EXPORTS
module.exports = requestDataIsProvided;
