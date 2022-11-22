router = require('express').Router()
const { register, login } = require('../controlers/auth.controlers')
router.post('/register',register)
router.post('/login',login)
module.exports = router