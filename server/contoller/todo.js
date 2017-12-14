import validate from '../middleware/validate';
import Todo from '../model/todo';
import User from '../model/user';

export default {
  /**
   * create a new todo
   * @param {any} req
   * @param {any} res
   * @return {void}
   */
  newTodo(req, res) {
    if (!validate(req, res, 'newTodo')) {
      return res.status(400).json({
        success: false,
        message: 'Please confirm your todo title, description and authorsId'
      });
    }

    return User.findOne({ _id: req.decoded.userId })
      .exec((err, user) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: 'User does not exist'
          });
        }

        if (!user) {
          return res.status(401).send({
            success: false,
            message: 'User does not exist'
          });
        }

        const newTodo = new Todo({
          title: req.body.title,
          description: req.body.description,
          authorsId: req.decoded.userId
        });
        newTodo.save((err, createdTodo) => {
          if (err) {
            return res.status(500).send({
              success: false,
              message: err
            });
          }

          return res.status(201).send({
            success: true,
            message: 'Created todo',
            createdTodo
          });
        });
      });
  },

  /**
   * list users todos
   * @param {any} req users request object
   * @param {any} res servers response
   * @return {void}
   */
  listTodo(req, res) {
    if (!validate(req, res, 'listTodo')) {
      return res.status(401).send({
        success: false,
        message: 'Confirm users id'
      });
    }

    return User.findOne({ _id: req.decoded.userId })
      .exec((err, user) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: 'User does not exist'
          });
        }

        if (!user) {
          return res.status(401).send({
            success: false,
            message: 'User does not exist'
          });
        }

        return Todo.find({ authorsId: req.decoded.userId })
          .exec((err, usersTodos) => {
            if (err) {
              return res.status(500).send({
                success: false,
                message: 'An error occured'
              });
            }

            return res.status(200).send({
              success: true,
              todos: usersTodos
            });
          });
      });
  }
};
