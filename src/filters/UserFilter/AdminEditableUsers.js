const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { USER_TYPE } = require("../../config/auth");

/** Set filter that states we should only affect admin editable user accounts */
const adminEditableUsers = (req, _, next) => {
  req.body.filter = {
    ...req.body.filter,
    userIdType: {
      [Op.or]: [
        USER_TYPE.ADMIN,
        USER_TYPE.RESIDENT_REP,
        USER_TYPE.SALES,
        USER_TYPE.SECURITY_GUARD,
        USER_TYPE.SECURITY_MANAGER,
      ],
    },
  };
  next();
};

//* EXPORTS
module.exports = adminEditableUsers;
