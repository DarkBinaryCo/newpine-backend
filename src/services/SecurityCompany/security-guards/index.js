/* 
    This file is simply meant to be an aggregator of all SecurityCompanyService/security-guards related functions.
    This file does not implement any logic of its own and simply serves the purpose of importing functions and exporting them out together so that they can be loaded from one file.
*/
const createResidentCheckin = require("./createResidentCheckin");
const createVisitorCheckin = require("./createVisitorCheckin");

const getResidentCheckins = require("./getResidentCheckins");
const getSingleResidentCheckin = require("./getSingleResidentCheckin");
const getVisitorCheckins = require("./getVisitorCheckins");
const getSingleVisitorCheckin = require("./getSingleVisitorCheckin");

const removeResidentCheckin = require("./removeResidentCheckin");
const removeVisitorCheckin = require("./removeVisitorCheckin");

//* EXPORTS
module.exports = {
  createResidentCheckin,
  createVisitorCheckin,
  getResidentCheckins,
  getSingleResidentCheckin,
  getVisitorCheckins,
  getSingleVisitorCheckin,
  removeResidentCheckin,
  removeVisitorCheckin,
};
