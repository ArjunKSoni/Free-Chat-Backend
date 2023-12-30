const mongoose =require("mongoose");
const messageSchema = mongoose.Schema({
    chatroom:{
        type:mongoose.SchemaTypes.ObjectId,
        required:"chatroom is required",
        ref:"Chatroom",
    },
    user:{
        type:String
    },
    message:String,
})

const Message=new mongoose.model("message",messageSchema);
module.exports =Message