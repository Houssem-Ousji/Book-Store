const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const order = require("../models/order.model");
module.exports.getUsers = async (req, res) => {
  try {
    if (req.payload.role == "admin") {
      const myUsers = await user.find();
      return res.status(200).json({ data: myUsers });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.getBestCustomer = async (req, res) => {
  try {
    if (req.payload.role == "admin" || req.payload.id == req.user._id) {
      const users = await user.find().sort({ orderNumber: -1 });
      return res.status(200).json({ data: users[0] });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.getUser = async (req, res) => {
  try {
    if (req.payload.role == "admin" || req.payload.id == req.user._id) {
      return res.status(200).json({ data: req.user });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    if (req.payload.role == "admin" || req.payload.id == req.user._id) {
      const updatedUser = await user.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
      });
      return res
        .status(200)
        .json({ message: updatedUser.firstName + " is updated" });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.deleteUser = async (req, res) => {
  try {
    if (req.payload.role == "admin" || req.payload.id == req.user._id) {
      const deletedUser = await user.findByIdAndDelete(req.user._id);
      const deleteAllHisOrders = await order.deleteMany({
        customer: req.user._id,
      });
      return res
        .status(200)
        .json({ message: deletedUser.firstName + " is deleted" });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
