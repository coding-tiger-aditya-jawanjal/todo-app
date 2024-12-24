const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "name , email & password required !" });
    }

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ msg: "email already registered !" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return res.status(400).json({ msg: "Error while hashing password !" });
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(token);

    if (!token) {
      return res.status(400).json({ msg: "Error while signing token !" });
    }

    res.cookie("token", token, {
      path: "/",
      sameSite: "none",
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res
      .status(201)
      .json({ msg: "user Signed Up Successfully !", user: newUser });
  } catch (error) {
    res.status(500).json({ msg: "Error in signin !", err: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "email & password required !" });
    }

    const emailExist = await User.findOne({ email });

    if (!emailExist) {
      return res.status(400).json({ msg: "Sign Up First !" });
    }

    const passwordMatched = await bcrypt.compare(password, emailExist.password);

    if (!passwordMatched) {
      return res.status(400).json({ msg: "Invalid credentials !" });
    }

    const token = jwt.sign({ id: emailExist._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    if (!token) {
      return res.status(400).json({ msg: "Error while signing token !" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res
      .status(200)
      .json({ msg: "User Logged In Successfully !", user: emailExist });
  } catch (error) {
    res.status(500).json({ msg: "Error in login !", err: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "none",
      expires: new Date(0),
    });

    res.status(200).json({ msg: "You Logged Out !" });
  } catch (error) {
    res.status(500).json({ msg: "Error in logout !", err: error.message });
  }
};

// add or update profile picture
// delete the profile picture
