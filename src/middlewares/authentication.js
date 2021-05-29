const jwt = require("jsonwebtoken");
const secret = "secureSecret";
exports.authenticateUser = (req, res, next) => {
  // check if there is an authorization token
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "authorization required" });
  }
  let splittedHeader = req.headers.authorization.split(" ");
  console.log(splittedHeader);

  if (splittedHeader[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "authorization format is Bearer <token>" });
  }
  let token = splittedHeader[1];
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) return res.status(500).json({ err });

    // check if it is valid

    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "invalid authorization token. Please login" });
    }
    next();
  });
};
