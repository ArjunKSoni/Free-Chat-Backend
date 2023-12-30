const mongoose =require("mongoose");
const userSchema = mongoose.Schema({
    User:String,
    Password:String,
    Email:String,
},{
    timestamps:true,
})

const User=new mongoose.model("User",userSchema);
module.exports =User