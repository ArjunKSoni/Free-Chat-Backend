const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://aksoni0520:mL9nxk7WXrIk4Z2f@cluster0.7xlbyyx.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connection successfull")
}).catch((e)=>{
    console.log(`error is ${e}`)
})