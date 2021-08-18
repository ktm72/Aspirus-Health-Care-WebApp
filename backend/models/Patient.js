const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    username: {
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
        type: String,
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
    },

    phone: {
        type: String,
        required: true,
        match: "^(?:7|0|(?:\+94))[0-9]{9,10}$",
    },

    profilePicture: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        //select set to false so password doesn't come when querying automatically
        select: false
    }

})

const Patient = mongoose.model("Patient",PatientSchema)
module.exports = Patient