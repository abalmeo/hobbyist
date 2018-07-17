const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.interests = !isEmpty(data.interests) ? data.interests : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle should be between 2 and 4 characters long';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills are required';
  }

  if (Validator.isEmpty(data.interests)) {
    errors.interests = 'Interests are required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
