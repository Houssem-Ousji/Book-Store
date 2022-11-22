const router = require("express").Router();
const book = require("../models/book.model");
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  getAvailable,
  getBestSeller,
} = require("../controlers/book.controlers");
const orderRouter = require('../routers/order.router');
const { verifyToken } = require("../middlewares/verifyToken");

router.param("id", async function (req, res, next, id) {
  try {
    const mybook = await book.findById(id);
    if (!mybook) {
      return res.status(404).json({ message: "Book doesnt exist" });
    }
    req.book = mybook;
    next();
  } catch (error) {
    return res.status(500).json({ message: error  });
  }
});

router.post("/", verifyToken,createBook);
router.get("/", verifyToken,getBooks);
router.get('/available',verifyToken,getAvailable)
router.get('/bestSeller',verifyToken,getBestSeller)
router.get("/:id", verifyToken,getBook);
router.put("/:id", verifyToken,updateBook);
router.delete("/:id", verifyToken,deleteBook);
router.use('/:id/order',verifyToken,orderRouter)
module.exports = router;
