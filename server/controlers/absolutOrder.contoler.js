const order = require("../models/order.model");

module.exports.getAllOrders = async (req, res) => {
  try {
    let myorders = null;
    if (req.payload.role == "admin") {
      myorders = await order.find();
    } else {
      myorders = await order.find({ customer: req.payload.id });
    }
    return res.status(200).json({ data: myorders });
  } catch (error) {
    return res.status(200).json({ message : error.message });
  }
};
module.exports.getAllConfimedOrders = async (req, res) => {
  try {
    let myorders = null;
    if (req.payload.role == "admin") {
      myorders = await order.find({ isConfirmed: true });
    } else {
      myorders = await order.find({
        customer: req.payload.id,
        isConfirmed: true,
      });
    }
    return res.status(200).json({ data: myorders });
  } catch (error) {
    return res.status(200).json({message : error.message });
  }
};
module.exports.getAllRecievedOrders = async (req,res)=>{
    try {
        let myorders = null;
        if (req.payload.role == "admin") {
          myorders = await order.find({ isRecieved: true });
        } else {
          myorders = await order.find({
            customer: req.payload.id,
            isRecieved: true,
          });
        }
        return res.status(200).json({ data: myorders });
      } catch (error) {
        return res.status(200).json({message : error.message });
      }
}
