const router = require("express").Router();
const {verifyToken} = require('../middlewares/verifyToken')
const {
  createOrder,
  getOrdersByBook,
  getConfirmedOrdersByBook,
  getOrder,
  updateOrder,
  deleteOrder,
  confirmOrder,
  recievingOrder,
} = require("../controlers/order.controler");
const order = require("../models/order.model");

router.param("id", async function (req, res, next, id) {
  try {
    const myorder = await order.findById(id);
    if (!myorder) {
      return res.status(404).json({ message: "order doesnt exist" });
    }
    req.order = myorder;
    next();
  } catch (error) {
    return res.status(500).json({ message: error  });
  }
});



router.post("/", verifyToken,createOrder);
router.get("/", verifyToken,getOrdersByBook);
router.get("/confimedOrders", verifyToken,getConfirmedOrdersByBook);
router.get("/:id", verifyToken,getOrder);
router.put("/:id", verifyToken,updateOrder);
router.delete("/:id", verifyToken,deleteOrder);
router.put("/:id/confirmOrder", verifyToken,confirmOrder);
router.put("/:id/recievingOrder", verifyToken,recievingOrder);

module.exports = router;
