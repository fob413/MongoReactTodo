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
    if (validate(req, res, 'signup')) {
      const user = new User();

      user.name = req.body.name;
      user.username = req.body.username;
      user.password = req.body.password;
      user.email = req.body.email;

      User.add(user);

      // user.add((err, newUser) => {
      //   console.log('>>>>>>>>', newUser);
      //   if (err) {
      //     res.status(500).send({
      //       success: false,
      //       message: err
      //     });
      //   }
      //   return res.status(201).send({
      //     success: true,
      //     message: 'succesfully signed up'
      //   });
      // });
    }
    return res.status(400).send({
      success: false,
      message: 'Invalid parameters'
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
      User.find({ username: req.body.username }, (err, user) => {
        return res.send({
          success: true,
          user
        });
      });
    }
    return res.status(400).send({
      success: false,
      message: 'Invalid parameters'
    });
  },

  list(req, res) {
    User.find((err, users) => {
      return res.status(200).send({
        success: true,
        users
      });
    });
  }
};
