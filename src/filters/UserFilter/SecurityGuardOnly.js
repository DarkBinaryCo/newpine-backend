const { USER_TYPE } = require("../../config/auth");

/** Set filter that states we should only affect security guard user accounts */
const securityGuardOnly = (req, res, next) => {
  req.body.filter = {
    ...req.body.filter,
    userTypeId: USER_TYPE.SECURITY_GUARD,
  };
  next();
};

//* EXPORTS
module.exports = securityGuardOnly;
