/** Gets the phone number entered in an international format
 * Currently only implements logic for Kenyan phone numbers
 * @param {String} phone The phone number
 * @return {String} The phone number in the international format: +${countryCode}${phoneNumber}
 */
const getPhoneInternationalFormat = (phone) => {
  const cleanPhone = phone.replace(/\s+/gi, "");
  const isInternational = cleanPhone[0] === "+";

  //TODO: Validate the phone number

  //? Getting here means our number is in the range
  // Return the phone number after removing whitespace if it is an international phone number
  if (isInternational) {
    return cleanPhone;
  } else {
    // Phone is in a local format
    let phoneCharArr = cleanPhone.split("");

    //? Kenya only
    if (phoneCharArr[0] === "0") {
      //! Change this logic when moving to different countries to account for the various area codes
      phoneCharArr[0] = "+254";
    }

    return phoneCharArr.join("");
  }
};

//* EXPORTS
module.exports = getPhoneInternationalFormat;
