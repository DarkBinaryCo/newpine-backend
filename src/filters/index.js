/* 
    This file is simply meant to be an aggregator of all filter related functions.
    Filters are actually just middleware that is used as an interceptor.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const UserFilter = require("./UserFilter");

//* EXPORTS
module.exports = {
  UserFilter,
};
