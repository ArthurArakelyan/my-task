const getError = (message, errors) => {
  const messageSplit = message.split('Error ');

  let errorString = messageSplit[1];

  if (!errorString) {
    return '';
  }

  errorString = errorString.slice(1, errorString.length - 2);

  const error = errors[errorString];

  if (!error) {
    return '';
  }

  return error;
};

export default getError;
