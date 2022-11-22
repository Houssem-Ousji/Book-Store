const order = require("../models/order.model");
const { setBill } = require("../methods/setBill");
const book = require("../models/book.model");
const user = require("../models/user.model");
module.exports.createOrder = async (req, res) => {
  try {
    const newOrder = new order({
      customer: req.payload.id,
      book: req.book._id,
      orderDate: req.body.orderDate,
      location: req.body.location,
      numOfBooks: req.body.numOfBooks,
    });
    await newOrder.save();
    await setBill(newOrder);
    return res.status(201).json({ message: "Order successfully created !" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.getOrdersByBook = async (req, res) => {
  try {
    let myOrders = null;
    if (req.payload.role == "admin") {
      myOrders = await order.find({ book: req.book._id });
    } else {
      myOrders = await order.find({
        book: req.book._id,
        customer: req.payload.id,
      });
    }
    return res.status(200).json({ data: myOrders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.getConfirmedOrdersByBook = async (req, res) => {
  try {
    let myOrders = null;
    if (req.payload.role == "admin") {
      myOrders = await order.find({ book: req.book._id, isConfirmed: true });
    } else {
      myOrders = await order.find({
        book: req.book._id,
        customer: req.payload.id,
        isConfirmed: true,
      });
    }
    return res.status(200).json({ data: myOrders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.getOrder = async (req, res) => {
  try {
    if (
      req.payload.role == "admin" ||
      req.order.customer.valueOf() == req.payload.id
    ) {
      return res.status(200).json({ data: req.order });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.updateOrder = async (req, res) => {
  try {
    if (
      req.payload.role == "admin" ||
      req.order.customer.valueOf() == req.payload.id
    ) {
      if (req.order.isConfirmed == true) {
        return res
          .status(400)
          .json({ message: "you cant update a confirmed order" });
      }
      const ordredBook = await book.findById(req.order.book.valueOf());
      await order.findByIdAndUpdate(
        req.order._id,
        {
          ...req.body,
          bill: req.body.numOfBooks * ordredBook.price,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(201).json({ message: "order is successfully updated" });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.deleteOrder = async (req, res) => {
  try {
    if (
      req.payload.role == "admin" ||
      req.order.customer.valueOf() == req.payload.id
    ) {
      const deletedOrder = await order.findByIdAndDelete(req.order._id);
      return res.status(200).json({ message: "order is successfully deleted" });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.confirmOrder = async (req, res) => {
  try {
    if (req.payload.role == "admin") {
      const confimedOrder = await order.findByIdAndUpdate(req.order._id, {
        ...req.body,
        isConfirmed: true,
      });
      return res
        .status(200)
        .json({ message: "order is successfully confirmed" });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.recievingOrder = async (req, res) => {
  try {
    if (
      req.payload.role == "admin" ||
      req.order.customer.valueOf() == req.payload.id
    ) {
      if (req.order.isConfirmed == false) {
        return res
          .status(400)
          .json({ message: "order is not confirmed yet !" });
      }
      // update the order model
      const confimedOrder = await order.findByIdAndUpdate(req.order._id, {
        ...req.body,
        isRecieved: true,
      });
      // update the book model and set num of Copy sales
      const ordredBook = await book.findByIdAndUpdate(
        req.order.book.valueOf(),
        { $inc: { numCopySales: Number(req.order.numOfBooks) } }
      );
      // update user order number
      const customerOfOrder = await user.findByIdAndUpdate(
        req.order.customer.valueOf(),
        { $inc: { orderNumber: 1 } }
      );
      return res
        .status(200)
        .json({ message: "order is successfully recieved" });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
