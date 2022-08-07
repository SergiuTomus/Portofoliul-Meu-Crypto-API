const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegister = (data) => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.delivery_address = !isEmpty(data.delivery_address)
    ? data.delivery_address
    : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Numele trebuie sa aiba intre 2 si 30 de caractere";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Campul nume trebuie completat";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Campul email trebuie completat";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 40 })) {
    errors.password = "Parola trebuie sa aiba minim 6 caractere";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Campul parola trebuie completat";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Campul confirmare parola trebuie completat";
  } else {
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Parolele nu se potrivesc";
    }
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Campul telefon trebuie completat";
  }
  if (Validator.isEmpty(data.delivery_address)) {
    errors.delivery_address = "Campul adresa de livrare trebuie completat";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegister;
