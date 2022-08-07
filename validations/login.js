const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateLogin = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Campul email trebuie completat";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Campul parola trebuie completat";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLogin;
