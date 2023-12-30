const mongoose =require("mongoose");
const chatroomSchema = mongoose.Schema({
    Name:String,

})

const Chatroom=new mongoose.model("chatroom",chatroomSchema);
module.exports =Chatroom