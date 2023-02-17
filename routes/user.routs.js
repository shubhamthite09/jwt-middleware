require("dotenv").config()
const {userModle} = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const express = require("express")
const userRouter = express.Router()
userRouter.use(express.json())

userRouter.post("/add",async(req,res)=>{
    try{
        let hasedpass = await bcrypt.hash(req.body.pass,5)
        let user = {name:req.body.name,pass:hasedpass,email:req.body.email,mobile:req.body.mobile}
        let usermodle = new userModle(user)
        await usermodle.save()
        res.send({msg:`New user added to database`})
    }catch(err){res.send(err.messege)}
})

userRouter.post("/login",async(req,res)=>{
    try{
        let user = await userModle.find({email:req.body.email})
        if(user.length<= 0) res.status(400).send(`user not found`)
        if(await bcrypt.compare(req.body.pass,user[0].pass)){
            const token = jwt.sign({userid:user[0]._id},"7nexx8374yx3y44r44rx4x84x4zmdiu8z39")
            res.send({msg:`ok done`,taken:token})
        }else{res.send(`wrong pass`)}
    }catch(err){res.send(err.messege)}
})

module.exports={userRouter}
