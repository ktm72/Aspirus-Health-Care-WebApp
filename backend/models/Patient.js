const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },

    lastname: {
        type: String,
        require: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },

    dob: {
        type: Date,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true,
    },

    nic: {
        type: String,
        required: true,
        unique: true,
        match: /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/
    },

    phone: {
        type: String,
        required: true,
        match: /^(?:7|0|(?:\+94))[0-9]{9,10}$/
    },

    address: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        //select set to false so password doesn't come when querying automatically
        select: false
    },

    imgUrl: {
        type: String,
        required: false
    },

    weight: {
        type: Number,
        required: false,
        default: 0
    },

    height: {
        type: Number,
        required: false,
        default: 0
    },

    bmi: {
        type: Number,
        required: false,
        default: 0
    },

    bloodGroup: {
        type: String,
        required: false,
        default: 'null'
    },

    bloodPressure: {
        type: Number,
        required: false,
        default: 0
    },

    sugarLevel: {
        type: Number,
        required: false,
        default: 0
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

//this function run before saving data to database
PatientSchema.pre("save", async function(next){

    //hashing the password
    //checking if the password is already hashed
    if (!this.isModified("password")){
        next();
    }

    //hashing the with difficulty level 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

//reset password token
PatientSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
};  

const Patient = mongoose.model("patient",PatientSchema)
module.exports = Patient