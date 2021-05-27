const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "secureSecret";
const expiry = 3600;

// register new user

exports.registerNewUser = (req, res) => {
  // fetch user details from req body
  // check if this username exists
  user.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (existingUser) {
      return res.status(400).json({ message: "username already exists" });
    }
    user.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.userName,
      },
      (err, newUser) => {
        if (err) {
          return res.status(500).json({ err });
        }
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).json({ err });
          }
          bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
            if (err) {
              return res.status(500).json({ err });
            }
            newUser.password = hashedPassword;
            newUser.save((err, savedUser) => {
              if (err) {
                return res.status(500).json({ err });
              }

              jwt.sign(
                {
                  id: newUser._id,
                  username: newUser.username,
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                },
                secret,
                { expiresIn: expiry },
                (err, token) => {
                  if (err) {
                    return res.status(500).json({ err });
                  }
                  return res.status(200).json({
                    message: "user registration succesful",
                    token,
                  });
                }
              );
            });
          });
        });
      }
    );
  });

  // create a new user
  // hash user password
  // save password to db
  // create jwt for user
  // send token to user
};
