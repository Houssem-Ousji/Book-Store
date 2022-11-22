const book = require("../models/book.model");
const order = require("../models/order.model");

module.exports.createBook = async (req, res) => {
  try {
    if (req.payload.role == "admin") {
      const newBook = new book({
        bookName: req.body.bookName,
        author: req.body.author,
        releasedDate: req.body.releasedDate,
        description: req.body.description,
        price: req.body.price,
        avaibility: req.body.avaibility,
      });
      await newBook.save();
      return res.status(201).json({ message: "book created successfully" });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.getBooks = async (req, res) => {
  try {
    const books = await book.find();
    return res.status(200).json({ data: books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.getBook = (req, res) => {
  try {
    return res.status(200).json({ data: req.book });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.updateBook = async (req, res) => {
  try {
    if (req.payload.role == "admin") {
      await book.findByIdAndUpdate(req.book._id, req.body);
      return res.status(201).json({ message: "book successfully updated" });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.deleteBook = async (req, res) => {
  try {
    if (req.payload.role == "admin") {
      await book.findByIdAndDelete(req.book._id);
      await order.deleteMany({ book: req.book._id });
      return res.status(200).json({ message: "book deleted succussfully" });
    }
    return res.status(403).json({ message: "anauthorized" });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};
module.exports.getAvailable = async (req, res) => {
  try {
    const books = await book.find({ avaibility: true });
    return res.status(200).json({ data: books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.getBestSeller = async (req, res) => {
    try {
        const books =  await book.find().sort({"numCopySales" : -1}) 
        return res.status(200).json({data : books[0]})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
