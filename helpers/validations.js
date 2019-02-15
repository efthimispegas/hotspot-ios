import _ from 'lodash';

const validateInput = (input, requiredLength) => {
  let error = '';

  if (input && input.length < requiredLength) {
    error = 'Needs to be longer';
  }
  return error;
};

const validateEmail = email => {
  let error = '';

  if (email) {
    if (email.split('').filter(x => x === '@').length !== 1) {
      error = 'Email missing @ symbol';
    } else if (email.indexOf('.') === -1) {
      error = 'Email should contain at least one dot (e.g. .com)';
    } else if (email.length < 5) {
      error = 'Email should be at least 6 characters long';
    }
  }
  return error;
};

const validateFullName = name => {
  let errors = [];

  if (!name.includes(' ')) {
    errors.push('You must provide both your given and your family name');
  }
  const words = name.split(' ');
  let flag = 0;
  words.forEach(word => {
    if (word.length < 3) {
      flag++;
    }
  });

  if (flag !== 0) {
    errors.push('Name must be at least 3 characters long');
  }

  return errors;
};

const isButtonDisabled = state => {
  const { title, description, date } = state;
  let disabled;
  if (title && description) {
    disabled = false;
  } else {
    disabled = true;
  }

  return disabled;
};

const validateCreationForm = fields => {
  const { message } = fields;
  if (!message || message.length < 1) {
    return "Message field can't be empty 🤨";
  }
  if (message.length < 10) {
    return 'Message needs to be at least 10 characters long 😁';
  }
  return false;
};

export {
  validateInput,
  validateEmail,
  validateFullName,
  isButtonDisabled,
  validateCreationForm
};
