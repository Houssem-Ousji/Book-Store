const {connectionDb} = require('./connectionDb')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bookRouter = require('./routers/book.router')
const userRouter = require('./routers/user.router')
const authRouter = require('./routers/auth.router')
const absolutOrderRouter = require('./routers/absolutOrder')

const port = process.env.PORT || 5000
const app = express()
connectionDb()

app.use(express.json())
app.use(cors())
app.use('/book',bookRouter)
app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/orders',absolutOrderRouter)
app.listen(port,()=>{
    console.log("listening to port  : " + port)
})