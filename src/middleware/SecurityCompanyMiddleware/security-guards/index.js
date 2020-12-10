/*
    This file is simply meant to be an aggregator of all SecurtyCompanyMiddleware/security-guards related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const CreateResidentCheckin = require("./CreateResidentCheckin");
const CreateVisitorCheckin = require("./CreateVisitorCheckin");
const GetResidentCheckins = require("./GetResidentCheckins");
const GetVisitorCheckins = require("./GetVisitorCheckins");
const RemoveResidentCheckin = require("./RemoveResidentCheckin");
const RemoveVisitorCheckin = require("./RemoveVisitorCheckin");

//* EXPORTS
module.exports = {
  CreateResidentCheckin,
  CreateVisitorCheckin,
  GetResidentCheckins,
  GetVisitorCheckins,
  RemoveResidentCheckin,
  RemoveVisitorCheckin,
};
