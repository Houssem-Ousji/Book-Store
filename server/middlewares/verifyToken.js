const jwt = require('jsonwebtoken')
module.exports.verifyToken = async (req,res,next) =>{
    try {
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({message : 'user must be logged in'})
        }
        req.payload = await jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (error) {
        return res.status(401).json({message : error.message})
    }
}