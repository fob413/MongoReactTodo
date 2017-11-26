/**
 * validate users request
 * @param {object} req user request body
 * @param {object} res servers response
 * @param {String} type type of validation to be done
 * @return {boolean} validated
 */
const validate = (req, res, type) => {
  let validated = false;
  switch (type) {
    case 'signup':
      if (
        req.body.name &&
        req.body.username &&
        req.body.password &&
        req.body.email
      ) {
        validated = true;
      }
      break;

    case 'signin':
      if (
        req.body.username &&
        req.body.password
      ) {
        validated = true;
      }
      break;

    default:
      break;
  }
  return validated;
};

export default validate;
