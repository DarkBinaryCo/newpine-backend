# Before you start

## Setup

Copy or rename the `env` file to `.env`. Populate the environment values with the appropriate values.

### Setup SMS

Currently, we are using [Africa's Talking](https://africastalking.com/) for SMSes.
The plan is to use Africa's Talking for messages to countries where it is cheaper to use them and another API (eg. [Twillio](https://www.twilio.com/), [Routee](https://www.routee.net/)) for every other country.

You will need to setup Africa's talking credentials in your `.env` if you want to test out SMS related functionality (eg. Sending OTP).

### Install node modules

After that, run `npm install` to install any dependencies we are using

## Running the backend

To start the server locally, use `npm run debug` to start a [nodemon](https://nodemon.io/) process. The application should now be running at `localhost:8080` and all endpoints can be accessed by using that as the base url.

**Example:**
To send a request to the endpoint `/auth` we'd use the full path: `localhost:8080/auth` as the url to send the request to.

---

This document will constantly be evolving as the project grows.

## Running unit tests

NewPine uses [Jest](https://jestjs.io/) to run unit tests on various components (utils and services at the moment).

To run tests, use `npm run test`. All tests should be succeeding.

## Notes on models

When defining the relationship between models, we are torn between two approaches `belongs*` or `has*`. How we have decided to handle this depends on the context in which we want to define the relationship between two models/tables.
If we want the owner's deletion to cascade down to the children, we use `belongsTo` while if we want to retain the child even after the owner dies, we use `hasMany` or `hasOne`

## Notes on database insert/update responses

Inserts into the database always return the full sequelize response.
This helps us view extra metadata about the insert operation

## Architectural decisions & rules

### Services

To access functions in another directory, one **MUST** access the functions through the aggregator.

Any function whose file name starts with an underscore (`_`) is internal to the directory it is in and is not exposed by the _aggregator_ for that directory. For example `services/Auth/otp/_saveOtp.js` can only be accessed by files in the `services/Auth/otp/` directory. Accessing these files (with underscores at the beginning) from any directory other than the directory they belong in is **FORBIDDEN**. These functions are meant to act as "private" functions within their directories.

# Objectives

- Add subscription handling _probably going to make this a separate repository that can be dragged into this codebase_

- Add payment handling (MPesa + Stripe) - _Probably going to bundle this with the subscription._

- Implement image upload & thumbnail generation functionality - _Probably going to make this its own repository that can be dragged into the project_

- Refactor the code to allow for more custom behaviour as far as setting different user types is concerned. Currently, this information is loaded from the server while it should actually come from the database. _Yet to figure out how to properly abstract this_

The goal is to eventually make this a good NodeJS boilerplate for applications that require OTP verification (SMS for now) and no password equipped with a built in subscription system as well as payment system.

The only thing left to implement in most cases would be your business logic

### TODO:

Figure out how to prevent the `package.json` files from clashing.
