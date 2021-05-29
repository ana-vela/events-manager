const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiry = Number(process.env.TOKEN_EXPIRY);

// register new user

exports.registerNewUser = (req, res) => {
  // fetch user details from req body
  // check if this username exists
  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (existingUser) {
      return res.status(400).json({ message: "username already exists" });
    }
    User.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        role: req.body.role,
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
                  role: newUser.role,
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

exports.loginUser = (req, res) => {
  // check if user exists
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (!foundUser) {
      return res.status(401).json({ message: "incorrect username" });
    }
    let match = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: "incorrect password" });
    }
    jwt.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser.role,
      },
      secret,
      {
        expiresIn: expiry,
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({ err });
        }
        return res.status(200).json({
          message: "User logged in",
          token,
        });
      }
    );
  });
};
