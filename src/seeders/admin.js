const User = require("../models/user");
const bcrypt = require("bcrypt");
let password = "admin123";

exports.seedAdmin = () => {
  User.findOne({ role: "admin" }, (err, admin) => {
    if (err) throw err;
    if (admin) {
      return "admin account already exists";
    }

    User.create(
      {
        firstName: "Event",
        lastName: "Manager",
        username: "eventadmin",
        role: "admin",
      },
      (err, user) => {
        if (err) throw err;
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save((err, savedUser) => {
              if (err) throw err;
              return "admin account created";
            });
          });
        });
      }
    );
  });
};
