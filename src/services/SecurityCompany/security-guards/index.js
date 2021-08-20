/* 
    This file is simply meant to be an aggregator of all SecurityCompanyService/security-guards related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const createResidentCheckin = require("./createResidentCheckin");
const createVisitorCheckin = require("./createVisitorCheckin");

const getResidentCheckins = require("./getResidentCheckins");
const getVisitorCheckins = require("./getVisitorCheckins");

const removeResidentCheckin = require("./removeResidentCheckin");
const removeVisitorCheckin = require("./removeVisitorCheckin");

//* EXPORTS
module.exports = {
  createResidentCheckin,
  createVisitorCheckin,
  getResidentCheckins,
  getVisitorCheckins,
  removeResidentCheckin,
  removeVisitorCheckin,
};
