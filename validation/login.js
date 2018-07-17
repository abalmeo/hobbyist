const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
//only takes in strings; if null or undefined, sent in as empty string
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  //validators will check for empty strings
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
//It will be valid if errors are empty 
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
