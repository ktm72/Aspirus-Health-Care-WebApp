const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
let Patient = require('../models/Patient');

//patient sign in controller
exports.patientsignin = async(req, res) => {
    const {email, password} = req.body;

    try{
        //finding patient by email
        const patient = await Patient.findOne({email}).select("+password");
        
        //if email doesn't exist
        if (!patient) 
            return res.status(404).json({message: "User doesn't exist"});

        //compare the provided password with the password in the database
        const ispasswordCorrect = await bcrypt.compare(password, patient.password);

        //if passwords don't match
        if (!ispasswordCorrect)
            return res.status(400).json({message: "Invalid credentials"});

        //creating a token
        const token = jwt.sign({email: patient.email, id: patient._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the patient object and token as the response
        res.status(200).json({result: patient, token})
    }catch(error){
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}

//patient sign up controller
exports.patientsignup = async(req,res) => {
    const {username, email, dob, gender, nic, phone, password} = req.body;

    try {
        //creating a new patient
        const patient = await Patient.create({username, email, dob, gender, nic, phone, password});

        //creating a token
        const token = jwt.sign({email: patient.email, id: patient._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the patient object and token as the response
        res.status(200).json({result: patient, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}
