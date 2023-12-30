const express = require('express')
const router = express.Router()
const Chatroom=require("../model/chatroom");
const Message = require('../model/message');

router.post('/create', async function (req, res){
    const name=req.body.Name;
    const chatroomExist= await Chatroom.findOne({Name:name});
    if(chatroomExist){
        res.send("chatroom with that name already exist");
    }
    else{
        chat =new Chatroom({
            Name:name
        })
        await chat.save();
        res.send({
            message:"chatroom created"
        })
    }
});

router.post("/getallchatroom",async(req,res)=>{
    const data=await Chatroom.find({});
    res.send({chatroom:data});
})

router.post("/getallmesages",async(req,res)=>{
    const chatid=req.body.id;
    const data=await Message.find({chatroom:chatid});
    res.send({messages:data});
})

module.exports = router;