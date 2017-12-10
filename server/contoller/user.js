import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/user';
import validate from '../middleware/validate';

const secret = process.env.SECRET;

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
        error: 'Invalid signup parameters'
      });
    }
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    user.save((err, newUser) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: err
        });
      }

      const token = jwt.sign({
        userId: newUser._id,
        username: newUser.username,
      }, secret, { expiresIn: 60 * 60 });

      return res.status(201).send({
        success: true,
        username: newUser.username,
        token
      });
    });
  },

  signin(req, res) {
    if (validate(req, res, 'signin')) {
      return User.findOne({ username: req.body.username })
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

          if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({
              success: false,
              error: 'Email or password is invalid'
            });
          }

          const token = jwt.sign({
            userId: user._id,
            username: user.username,
          }, secret, { expiresIn: 60 * 60 });

          return res.status(201).send({
            success: true,
            username: user.username,
            token
          });
        });
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
