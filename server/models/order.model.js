const mongoose = require("mongoose");
const book = require("./book.model");
const user = require("./user.model");
const Schema = require("mongoose").Schema;

const orderSchema = new Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "book",
    },
    orderDate: {
      type: Date,
    },
    location: {
      // a remplir
      type: String,
    },
    numOfBooks: {
      // a remplir
      type: Number,
      minLength: [1, "number of books must be atleast 1"],
    },
    bill: {
      type: Number,
      default: 0,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isRecieved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// orderSchema.post("save", async function () {
//   try {
//     const ordredBook = await book.findById(this.book.valueOf());
//     const theOrder = await order.findByIdAndUpdate(this._id.valueOf(), {
//       bill: Number(ordredBook.price * this.numOfBooks),
//     });
//     return;
//   } catch (error) {
//     return console.log(error);
//   }
// });


const order = mongoose.model("order", orderSchema);

module.exports = order;
