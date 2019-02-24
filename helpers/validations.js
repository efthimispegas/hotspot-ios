import _ from 'lodash';

const validateInput = (type, input, requiredLength) => {
  let error = null;

  if (type === 'email') {
    error = validateEmail(input);
  } else if (type === 'password') {
    error = validatePassword(input, requiredLength);
  } else if (type === 'fullname') {
    error = validateFullName(input);
  } else if (type === 'username') {
    error = validateUsername(input, requiredLength);
  }

  return error;
};

const validateUsername = (input, requiredLength) => {
  let error = null;

  if (input && input.length < requiredLength) {
    error = 'Needs to be longer';
  }
  return error;
};

const validatePassword = (input, requiredLength) => {
  let error = null;

  if (input && input.length < requiredLength) {
    error = 'Needs to be longer';
  }
  return error;
};

const validateEmail = email => {
  let error = null;

  if (email) {
    if (email.split('').filter(x => x === '@').length !== 1) {
      error = 'Email missing @ symbol';
    } else if (email.indexOf('.') === -1) {
      error = 'Email should contain at least one dot (e.g. .com)';
    } else if (email.indexOf('@') !== -1 && email.indexOf('.') !== -1) {
      const at = email.indexOf('@');
      const dot = email.indexOf('.');
      const domain = email.slice(at + 1, dot);
      const end = email.slice(dot + 1, email.length);
      if (!domain) {
        error = 'Email missing domain name (e.g. gmail)';
      }
      if (!end) {
        error = 'Email missing ending name (e.g. com)';
      }
    }
  }
  return error;
};

const validateFullName = name => {
  let errors = [];

  if (!name.includes(' ')) {
    errors.push('You must provide both your given and your family name.\n');
  }
  const words = name.split(' ');
  let flag = false;
  words.forEach(word => {
    if (word.length < 3) {
      flag = true;
    }
  });

  if (flag) {
    errors.push(
      'Both given name and family name must be at least 3 characters long'
    );
  } else if (errors.length === 0) {
    errors = null;
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

const validateCommentReply = comment => {
  if (!comment || comment.length < 1) {
    return "Comments can't be empty 🤨";
  }
  if (comment.length < 3) {
    return 'Comments need to be at least 3 characters long 😁';
  }
  return false;
};

export {
  validateInput,
  isButtonDisabled,
  validateCreationForm,
  validateCommentReply
};
