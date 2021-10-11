const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Admin = require('../models/Admin');

//admin sign in controller
exports.adminsignin = async(req, res) => {
    const {email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password)
        return res.status(400).json({message: "Please provide an email and password" });

    try{
        //finding admin by email
        const admin = await Admin.findOne({email}).select("+password");
        
        //if admin doesn't exist
        if (!admin) 
            return res.status(404).json({message: "You are not an Admin!!"});

        //compare the provided password with the password in the database
        const ispasswordCorrect = await bcrypt.compare(password, admin.password);

        //if passwords don't match
        if (!ispasswordCorrect)
            return res.status(400).json({message: "Invalid credentials"});

        //creating a token
        const token = jwt.sign({email: admin.email, id: admin._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the admin object and token as the response
        res.status(200).json({success: true, result: admin, token})
    }catch(error){
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}

//admin sign up controller
exports.adminsignup = async(req,res) => {
    const {username, email, password} = req.body;

    try {
        //checking email already exists
        const checkEmail = await Admin.findOne({email})

        if(checkEmail)
            return res.status(409).json({message: "User with this email already exists"})

        //creating a new admin
        const admin = await Admin.create({username, email, password});

        //creating a token
        const token = jwt.sign({email: admin.email, id: admin._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the admin object and token as the response
        res.status(200).json({success: true, result: admin, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}