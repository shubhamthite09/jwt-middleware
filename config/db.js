require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set('strictQuery', false)

const connection = mongoose.connect("mongodb+srv://thiteshubham:thiteshubham@cluster0.zphu3ww.mongodb.net/auth?retryWrites=true&w=majority")

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    pass:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:Number,required:true}
})

const postSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    user:{type:String,required:true}
})

const userModle = mongoose.model('jwt',userSchema)
const userNotes = mongoose.model('note',postSchema)

module.exports={connection,userModle,userNotes}
