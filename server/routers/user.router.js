const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getBestCustomer,
} = require("../controlers/user.controlers");
const { verifyToken } = require("../middlewares/verifyToken");
const user = require("../models/user.model");
const router = require("express").Router();

router.param("id", async function (req, res, next, id) {
    try {
      const myuser = await user.findById(id);
      if (!myuser) {
        return res.status(404).json({ message: "user doesnt exist" });
      }
      req.user = myuser;
      next();
    } catch (error) {
      return res.status(500).json({ message: error  });
    }
  });

router.get("/", verifyToken,getUsers);
router.get("/bestCustomer", verifyToken,getBestCustomer);
router.get("/:id", verifyToken,getUser);
router.put("/:id", verifyToken,updateUser);
router.delete("/:id", verifyToken,deleteUser);
module.exports = router;
