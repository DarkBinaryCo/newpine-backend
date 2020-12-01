/* 
    This file is simply meant to be an aggregator of all VisitorService related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const getVisitorInvitations = require("./getVisitorInvitations");
const inviteVisitor = require("./inviteVisitor");
const revokeVisitorInvitation = require("./revokeVisitorInvitation");
const updateVisitorInvitation = require("./updateVisitorInvitation");

//* EXPORTS
module.exports = {
  getVisitorInvitations,
  inviteVisitor,
  revokeVisitorInvitation,
  updateVisitorInvitation,
};
