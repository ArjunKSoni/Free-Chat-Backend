const express = require('express')
const router = express.Router()
const User=require("../model/user");
const Bcrypt=require("bcrypt");

router.post('/signup',async function (req, res) {
    const data=await User.findOne({User:req.body.User});
    if(data){
        console.log(data);
        res.send("User Already Exist");
    }
    else{
        var Pass=req.body.Password
        Pass=await Bcrypt.hashSync(Pass,7);
        const NewUser= new User({
            User:req.body.User,
            Password:Pass,
            Email:req.body.Email
        })
        await NewUser.save();
        const user=await User.find({User:req.body.User});
        console.log(user[0].User);
        res.send({status:user[0]});
    }
});
router.post('/login',async function (req, res) {
    const data=await User.findOne({Email:req.body.Email});
    if(!data){
        console.log(data);
        res.send("User Doesn't Exist");
    }
    else{
        var Pass=req.body.Password
        if(Bcrypt.compareSync(Pass,data.Password)){
            res.send({token:data});
        }
        else{
            res.send("Incorrect Password");
        }
    }
});

router.post("/remove", async (req, res) => {
    const user=req.body.User;
    const data=await User.deleteMany({User:user});
    return res.send({data:data});
  }
)

module.exports = router;