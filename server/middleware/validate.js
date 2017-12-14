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

    case 'newTodo':
      if (
        req.body.title &&
        req.body.description
      ) {
        validated = true;
      }
      break;

    case 'listTodo':
      validated = true;
      break;

    case 'finishTodo':
      if (
        req.body.todoId
      ) {
        validated = true;
      }
      break;

    case 'deleteTodo':
      if (
        req.body.todoId
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
