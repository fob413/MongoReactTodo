import User from '../model/user';
import validate from '../middleware/validate';

export default {
  /**
   * signup a new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  signup(req, res) {
    if (!validate(req, res, 'signup')) {
      return res.status(400).json({
        success: false,
        error: 'Bad request'
      });
    }
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    user.save((err, newUser) => {
      if (err) {
        console.log('===> error', err);
        return res.status(500).json(err);
      }
      console.log('===> success', newUser);
      return res.status(201).json(newUser);
    });
  },

  /**
   * login user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  signin(req, res) {
    if (validate(req, res, 'signin')) {
      User.find({ username: req.body.username }, (err, user) => res.send({
        success: true,
        user
      }));
    }
    return res.status(400).send({
      success: false,
      message: 'Invalid parameters'
    });
  },

  list(req, res) {
    User.find((err, users) => res.status(200).send({
      success: true,
      users
    }));
  }
};
