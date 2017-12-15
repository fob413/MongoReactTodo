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
          return res.status(404).send({
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
          return res.status(404).send({
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
  },

  /**
   * finish a users todo
   * @param {any} req users request object
   * @param {any} res servers response
   * @return {void}
   */
  finishTodo(req, res) {
    if (!validate(req, res, 'finishTodo')) {
      return res.status(401).send({
        success: false,
        message: 'no todo id sent'
      });
    }

    return User.findOne({
      _id: req.decoded.userId
    })
      .exec((err, user) => {
        if (err) {
          return res.status(404).send({
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

        return Todo.findById({ _id: req.body.todoId })
          .exec((err, usersTodo) => {
            if (err) {
              return res.status(500).send({
                success: false,
                message: 'an error occured fetching users todo'
              });
            }

            if (!usersTodo) {
              return res.status(404).send({
                success: false,
                message: 'Todo does not exist'
              });
            }

            usersTodo.completed = true;

            usersTodo.save((err, savedTodo) => {
              if (err) {
                return res.status(500).send({
                  success: false,
                  message: 'an error occured when updating todo'
                });
              }

              return res.status(201).send({
                success: true,
                savedTodo
              });
            });
          });
      });
  },

  /**
   * delete a users todo
   * @param {any} req users request object
   * @param {any} res servers response
   * @return {void}
   */
  deleteTodo(req, res) {
    if (!validate(req, res, 'deleteTodo')) {
      return res.status(401).send({
        success: false,
        message: 'no todo id sent'
      });
    }

    return User.findOne({
      _id: req.decoded.userId
    })
      .exec((err, user) => {
        if (err) {
          return res.status(404).send({
            success: false,
            message: 'user does not exist'
          });
        }

        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'user does not exist'
          });
        }
        console.log('>>>>>>>>>>', req.query.id);

        return Todo.findByIdAndRemove({ _id: req.query.id })
          .exec((err) => {
            if (err) {
              return res.status(400).send({
                success: false,
                message: 'please try again later',
                todoId: req.header('todoId')
              });
            }

            return res.status(200).send({
              success: true,
              message: 'todo successfully deleted'
            });
          });
      });
  }
};
