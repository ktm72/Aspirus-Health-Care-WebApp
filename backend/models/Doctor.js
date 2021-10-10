const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const DoctorSchema =new Schema({

    name:{
        type:String,
        required:true,
    },

    slmcreg:{
        type:Number,
        required:true,
        unique:true,
        match:/^[0-9]{4,5}$/
    },

    phoneno:{
        type:Number,
        required:true,
        match: /^(?:7|0|(?:\+94))[0-9]{9,10}$/
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },

    title:{
        type:String,
        required:true
    },

    gender:{
        type:String,
        required:true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },

    speciality:{
        type:String,
        required:true
    },

    languages:{
        type:[String],
        required:true
    },

    qualification:{
        type:String,
        required:true
    },

    doctorfee:{
        type:Number,
        required:true
    },

    availableDay:{
        type:[String],
        required:true
    },

    availableTimeFrom:{
        type:String,
        required:true
    },

    availableTimeTo:{
        type:String,
        required:true
    },

    practicingLocations:{
        type:String,
        required:true
    },

    nameOfAccountHolder:{
        type:String,
        required:true
    },

    accountNo:{
        type:String,
        required:true,
        match:/^[0-9]{6,18}$/
    },

    bankName:{
        type:String,
        required:true
    },

    bankBranch:{
        type:String,
        required:true
    },

    imgUrl: {
        type: String,
        required: false
    },

    signature:{
        type:String,
        required:false
    },

    profilePicture:{
        type:String,
        required:false
    },

    slmccertificate:{
        type:String,
        required:false
    }
})

DoctorSchema.pre("save", async function(next){
    //checking if the password is already hashed
    if (!this.isModified("password")){
        next();
    }

    //hashing
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const Doctor = mongoose.model("doctor",DoctorSchema)
module.exports= Doctor
