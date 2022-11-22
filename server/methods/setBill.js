const order = require("../models/order.model");
const book = require("../models/book.model");
module.exports.setBill = async (theOrder) => {
  try {
    const ordredBook = await book.findById(theOrder.book.valueOf());
    await order.findByIdAndUpdate(theOrder._id.valueOf(), {
      bill: ordredBook.price * theOrder.numOfBooks,
    });
    return console.log("setbill excuted")
  } catch (error) {
    console.log(error)
  }
};
