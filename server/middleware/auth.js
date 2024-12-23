const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(400).json({ msg: "No token in auth !" });
    }

    const isTokenVerified = await jwt.verify(token, process.env.JWT_SECRET);

    if (!isTokenVerified) {
      res.status(400).json({ msg: "Error in verrifying token !" });
    }

    const loggedUser = await User.findById(isTokenVerified.id).select("-password");

    if (!loggedUser) {
      res.status(400).json({ msg: "No such user !" });
    }

    req.user = loggedUser;
    next();
  } catch (error) {
    res.status(500).json({ msg: "Error in auth !", err: error.message });
  }
};
