const express = require("express")
const noteRouter = express.Router()
const {userNotes} = require("../config/db")
noteRouter.use(express.json())

noteRouter.get('/',async(req,res)=>{
    try{
        let notes = await userNotes.find({user:req.body.user})
        res.send(notes)
    }catch(err){
        res.send({err:err.messege})
    }
})

noteRouter.post('/add',async(req,res)=>{
    try{
        let note = new userNotes(req.body)
        await note.save()
        res.send({msg:`ok note is added ..`})
    }catch(err){
        res.send({err:err.messege})
    }
})

noteRouter.delete('/delete/:id',async(req,res)=>{
    try{
        await userNotes.findOneAndDelete({_id:req.params.id})
        res.send(`it is deleted ...`)
    }catch(err){
        res.send({err:err.messege})
    }
})

noteRouter.patch('/update/:id',async(req,res)=>{
    try{
        await userNotes.findByIdAndUpdate({_id:req.params.id},req.body)
        res.send("upadted notes ....")
    }catch(err){
        res.send({err:err.messege})
    }
})

module.exports={noteRouter}