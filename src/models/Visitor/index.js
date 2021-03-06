/* 
    This file is simply meant to be an aggregator of all Vehicle related models.
    This file does not implement any logic of its own and simply serves the purpose of importing models and exporting them out together so that they can be loaded from one file.
    Access to individual files is restricted only to files in the same directory or children of that directory
*/
const VisitorCheckin = require("./VisitorCheckin");
const VisitorInvitation = require("./VisitorInvitation");

//* EXPORTS
module.exports = {
  VisitorInvitation,
  VisitorCheckin,
};
