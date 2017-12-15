import path from 'path';
import Todo from '../model/todo';
import auth from '../middleware/authenticate';
import todoController from '../contoller/todo';
import userController from '../contoller/user';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Hi, Welcome to PostIt',
  }));

  // create new account
  app.post('/api/v1/signup', userController.signup);

  // login to account
  app.post('/api/v1/signin', userController.signin);

  // create new todo
  app.post('/api/v1/todo', auth, todoController.newTodo);

  // list users todo
  app.get('/api/v1/todo/list', auth, todoController.listTodo);

  // finish user todo
  app.patch('/api/v1/todo/finish', auth, todoController.finishTodo);

  // delete user todo
  app.delete('/api/v1/todo/delete', auth, todoController.deleteTodo);

  // list users
  app.get('/api/v1/list/user', userController.list);
};
