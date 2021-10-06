const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Patient = require('../models/Patient');
const sendEmail = require("../utils/sendEmail")

//patient sign in controller
exports.patientsignin = async(req, res) => {
    const {email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password)
        return res.status(400).json({message: "Please provide an email and password" });

    try{
        //finding patient by email
        const patient = await Patient.findOne({email}).select("+password");
        
        //if patient doesn't exist
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
        res.status(200).json({success: true, result: patient, token})
    }catch(error){
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}

//patient sign up controller
exports.patientsignup = async(req,res) => {
    const {firstname, lastname, email, gender, nic, phone, address, password, imgUrl} = req.body;
    const dob = new Date(req.body.dob)

    const today = new Date().getFullYear()
    const year = dob.getFullYear()
    const age = today - year

    try {
        //checking email already exists
        const checkEmail = await Patient.findOne({email})
        const checkNIC = await Patient.findOne({nic})

        if(checkEmail)
            return res.status(409).json({message: "User with this email already exists"})
        
        if(checkNIC)
            return res.status(409).json({message: "User with this NIC already exists"})

        //creating a new patient
        const patient = await Patient.create({firstname, lastname, email, dob, age, gender, nic, phone, address, password, imgUrl});

        //creating a token
        const token = jwt.sign({email: patient.email, id: patient._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the patient object and token as the response
        res.status(200).json({success: true, result: patient, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}

//update patient controller
exports.updatePatient = async(req,res) => {
    let patientID = req.params.id;

    const {firstname, lastname, email, phone, address, bloodGroup, imgUrl} = req.body;
    const weight = Number(req.body.weight)
    const height = Number(req.body.height)
    const bloodPressure = Number(req.body.bloodPressure)
    const sugarLevel = Number(req.body.sugarLevel)
    let bmi

    if(weight != undefined && height != undefined){
        bmi = weight / (height * height)
        bmi = bmi.toFixed(2);
    }

    //object with provided data
    const updatePatient = {
        firstname, lastname, email, phone, address,
        weight, height, bloodPressure, bloodGroup, sugarLevel, bmi, imgUrl
    }

    try {
        //find patient by patientID and update the patient with provided data
        await Patient.findByIdAndUpdate(patientID, updatePatient);

        //sending the status message successful
        res.status(200).json({success: true, message: "Profile updated successfully"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
}

//delete patient controller
exports.deletePatient = async(req,res) => {
    let patientID = req.params.id;

    try {
        //find patient by patientID and delete it
        await Patient.findByIdAndDelete(patientID);

        //sending the status message successful
        res.status(200).json({success: true, message: "Patient deleted"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
}

//Forgot Password controller
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
        //finding patient by email
        const patient = await Patient.findOne({ email });
  
        //if patient doesn't exist
        if (!patient)
            return res.status(404).json({message: "No user with this email"});
  
        // Reset Token Gen and add to database hashed (private) version of token
        const resetPasswordToken = patient.getResetPasswordToken();
    
        await patient.save();
    
        // Create reset url to email to provided email
        const resetPasswordUrl = `http://localhost:3000/patient/passwordreset/${resetPasswordToken}`;
    
        // HTML Message
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please make a put request to the following link:</p>
            <a href=${resetPasswordUrl} clicktracking=off>${resetPasswordUrl}</a>
        `;
    
        try {
            //sending the the email
            await sendEmail({to: patient.email, subject: "Password Reset Request", text: message});
    
            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (error) {
            
            //if the email sending failed remove reset token
            patient.resetPasswordToken = undefined;
            patient.resetPasswordExpire = undefined;
    
            await patient.save();
    
            res.status(500).json({message: "Email could not be sent", error: error.message});
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};

//Reset Password controller
exports.resetPassword = async (req, res) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetPasswordToken).digest("hex");
  
    try {
        //check whether a user exists with same reset password token and expiration time greater than current time
        const patient = await Patient.findOne({resetPasswordToken,resetPasswordExpire: { $gt: Date.now() },});
  
        if (!patient)
            return res.status(400).json({message: "Invalid Token", error: error.message});

        //saving the new password
        patient.password = req.body.password;

        //remove the reset password token
        patient.resetPasswordToken = undefined;
        patient.resetPasswordExpire = undefined;
    
        await patient.save();

        //creating a token
        const token = jwt.sign({email: patient.email, id: patient._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
    
        res.status(201).json({success: true, result: patient, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};

//fetch patients controller
exports.fetchAll = async(req,res) => {

    try {
        //find all patients in the database
        const patients = await Patient.find();

        res.status(200).json({success: true, result: patients})
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong", error: error.message});
    }
}

//fetch one patient controller
exports.fetchOne = async(req,res) => {
    let patientID = req.params.id;

    try {
        //find patient with the specific id
        const patient = await Patient.findById(patientID);

        res.status(200).json({success: true, result: patient})
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong", error: error.message});
    }
}