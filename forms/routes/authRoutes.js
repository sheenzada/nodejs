const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async(req,res)=>{
    try{

        const {username,email,password} = req.body;

        const userExists = await User.findOne({email});

        if(userExists){
            return res.json({message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = new User({
            username,
            email,
            password:hashedPassword
        });

        await user.save();

        res.json({message:"User Registered Successfully"});

    }catch(err){
        res.status(500).json(err);
    }
});


router.post("/login", async(req,res)=>{
    try{

        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.json({message:"Invalid Email"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({message:"Wrong Password"});
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );

        res.json({
            message:"Login Successful",
            token
        });

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;