const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var validator = require("validator");

module.exports.register = async (req, res) => {
  try {
    const isEmailExist = await user.findOne({ email: req.body.email });
    if (isEmailExist) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const isUserNameExist = await user.findOne({ userName: req.body.userName });
    if (isUserNameExist) {
      return res.status(400).json({ message: "User Name already exist" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User successfully created !" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    let isUserExist = null;
    const isEmail = validator.isEmail(req.body.logInfo);
    if (isEmail) {
      isUserExist = await user.findOne({ email: req.body.logInfo });
    } else {
      isUserExist = await user.findOne({ userName: req.body.logInfo });
    }
    if (isUserExist) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        isUserExist.password
      );
      if (!validPassword) {
        return res.status(400).json({ message: "invalid data" });
      }
      const token = jwt.sign(
        {
          id: isUserExist._id,
          userName: isUserExist.userName,
          role: isUserExist.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      )
      return res.status(200).json({ message: "Successfully loged in" ,token : token});
    }
    return res.status(404).json({ message: "user doesnt exist" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};