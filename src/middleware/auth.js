const jwt = require('jsonwebtoken');

const { pwEncryptionKey, } = require('../config/var');
const User = require('../api/models/auth.model');


exports.userValidation = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const authorizedData = await jwt.verify(token, pwEncryptionKey);
      req.user = authorizedData;
      let user = await User.findById({ _id: req.user.sub }).lean();

      if (!user) {
        return res.status(403).json({ success: false, error: true, message: 'There is no account linked to that id', notExist: 1 });
      }
      else {
        req.user = user;
        console.log(user + "user")
        next();
      }

    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid Token" });
    }
  }

  if (!token) {
    return res.status(400).json({ success: false, message: 'Token not found' });
  }
}


