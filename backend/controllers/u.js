const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');   
const User = require('../models/user.js')
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const register =async(req , res)=>{
const  {name, email , password ,mobile,dob}  = req.body;

try {
    if(!name|| !email || !password || !mobile || !dob){
        return res.status(400).json({message : "All fields are required"})
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message : "Email already registered"})
    }

    const newUser = new User({name , email , password , mobile , dob});
    await newUser.save();
   res.status(201).json({
  message: "User registered successfully"
  
});

} catch (error) {
    console.log(error);
    res.status(500).json({message : "Server error"})
}
}

const login = async(req , res)=>{
    const {email , password} = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({message : "All fields are required"})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message : "Invalid email"})
        }

         const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id ,name:user.name,email:user.email},
         process.env.JWT_SECRET, 
         { expiresIn: "15m",}
     
);
        res.status(200).json({message : "Login successful", user, token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Server error"})
    }   
}

module.exports = {register,login}