const { getAllOrders, getAllConfimedOrders,getAllRecievedOrders } = require('../controlers/absolutOrder.contoler')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

router.get('/all',verifyToken,getAllOrders)
router.get('/allConfimed',verifyToken,getAllConfimedOrders)
router.get('/allRecieved',verifyToken,getAllRecievedOrders)
module.exports = router