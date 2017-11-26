import path from 'path';
import Todo from '../model/todo';
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
  app.post('/api/v1/todo', todoController.newTodo);

  // list users
  app.get('/api/v1/list/user', userController.list);
};
