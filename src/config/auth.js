const OTP_LENGTH = 4;

/** One Time Password (OTP) expiry time */
const OTP_EXPIRY_SECONDS = 60;

/** Token expiry time */
const TOKEN_EXPIRY_SECONDS = 60 * 24 * 60 * 60; // 2 months

/** User types ~ corresponds to UserTypeIds */
const USER_TYPE = {
  ADMIN: 1,
  SALES: 2,
  SECURITY_MANAGER: 3,
  SECURITY_GUARD: 4,
  RESIDENT: 5,
  RESIDENT_REP: 6,
};

const TOKEN_SALT = process.env.TOKEN_SALT;

//* EXPORTS
module.exports = {
  OTP_EXPIRY_SECONDS,
  OTP_LENGTH,
  TOKEN_EXPIRY_SECONDS,
  TOKEN_SALT,
  USER_TYPE,
};
