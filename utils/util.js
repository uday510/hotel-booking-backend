/**
 * Validate the email format.
 * 
 * @param {string} email - The email address to validate.
 * @returns {Array|null} - An array containing the matched parts of the email or null if not valid.
 */
exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Validate the password format.
 * 
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
exports.validatePassword = (password) => {
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};