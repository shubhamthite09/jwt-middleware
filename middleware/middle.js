const jwt = require("jsonwebtoken")
require("dotenv").config()

const verify = (req,res,next)=>{
    let token = req.headers.authorization
    if(token){jwt.verify(token,"7nexx8374yx3y44r44rx4x84x4zmdiu8z39",(err,deco)=>{
        if(deco){
            req.body.user = deco.userid
            next()
        }else{
            res.send("login needed ...")
        }
    })
    }else{
        res.send("login needed ...")
    }
}

module.exports={verify}
