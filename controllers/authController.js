const User = require("../models/User");
const authHelper = require("../utils/authHelper");
const jwt = require("jsonwebtoken");
require("dotenv/config");
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(401)
        .send({ message: "email and password are required" });
    const user = await User.findOne({ email }).select("+password");
    const valid = await authHelper.matchPassword(password, user.password);
    if (!user || !valid)
      return res.status(401).send({ message: "Email or Password is wrong" });
    const token = await authHelper.createNewToken(user.id);
    user.password = undefined;
    res.status(200).json({ data: { ...user, token } });
  } catch (err) {
    next(err);
  }
};
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res
        .status(401)
        .send({ message: "username, email and password are required" });
    const user = await User.create({
      username,
      email,
      password,
    });
    user.password = undefined;
    res.status(201).send({ data: user });
  } catch (err) {
    next(err);
  }
};

exports.autheticateUser = async (req, res, next) => {
  try {
    //checking that is token is given or not
    if (!req.headers.token)
      return res.status(401).send({ message: "Token is required" });
    //verify the jwt token and decoding data from that
    const userCredentials = await jwt.verify(
      req.headers.token,
      process.env.TOKEN_SECRET_KEY
    );
    const user = await User.findById(userCredentials);
    if (!user) return res.status(401).send({ message: "User not found" });
    //injecting user details to the request
    req.user = userCredentials;
    //sending forward to the route function
    return next();
  } catch (err) {
    next(err);
  }
};
