require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = {
  loginCheck: (req, res, next) => {
    jwt.verify(req.headers.token, process.env.secretKey, function(err, decoded) {
      if(decoded){
        req.decoded = decoded
        next()
      } else {
        res.status(403).json({
          message: "invalid token"
        })
      }
    })
  }
}