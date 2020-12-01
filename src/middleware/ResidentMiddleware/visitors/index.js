/* 
    This file is simply meant to be an aggregator of all ResidentMiddleware/visitors related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const InviteVisitor = require("./InviteVisitor");
const GetVisitorInvitations = require("./GetVisitorInvitations");
const RevokeVisitorInvitation = require("./RevokeVisitorInvitation");

// Vehicles

//* EXPORTS
module.exports = {
  InviteVisitor,
  GetVisitorInvitations,
  RevokeVisitorInvitation,
};
