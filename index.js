require('dotenv').config()
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.routs")
const {noteRouter} = require("./routes/notes.routs")
const {verify} = require("./middleware/middle")
const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{res.send("home page")})

app.use("/user",userRouter)
app.use(verify)
app.use("/note",noteRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log(`coneccted to DB...`)
    }catch(err){
        console.log(err)
    }
    console.log(`port ${process.env.PORT}...`)
})