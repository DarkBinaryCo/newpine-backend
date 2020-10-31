/* 
    This file is simply meant to be an aggregator of all UserService related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const createUser = require('./createUser');
const getUserByFilter = require('./getUserByFilter');
const getUserById = require('./getUserById');
const getUserByPhone = require('./getUserByPhone');
const updateUser = require('./updateUser');

//* EXPORTS
module.exports = {
    createUser,
    updateUser,
    getUserByFilter,
    getUserById,
    getUserByPhone
};