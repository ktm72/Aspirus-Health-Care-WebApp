const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

//doctor sign in () 
exports.signinDoctor = async(req,res) => {
    const{ slmcreg, password } = req.body;

        try{
            //find the doctor by SLMC registration number
            const doctor = await Doctor.findOne({slmcreg}).select("+password");

            //if the SLMC registration doesn't exist
            if (!doctor)
                return res.status(404).json({message: "Such SLMC registration number doesn't exist"});

            //compare the password with provided password
            const ispasswordMatch = await bcrypt.compare(password, doctor.password);

            //if passwords didn't match
            if(!ispasswordMatch)
                return res.status(400).json({message: "Invalid Password"});

            //creating a token
            const token = jwt.sign({slmcreg: doctor.slmcreg, id: doctor._id}, process.env.JWT_SECRET, {expiresIn:"1h"} )

            //joining the doctor object and token
            res.status(200).json({result: doctor, token})
        }catch(error){
            res.status(500).json({message: "Something went wrong", error: error.message})
        }
}


//doctor signup
exports.signupDoctor = async(req,res) => {

    const {title, name, email, speciality, gender, languages, phoneno, qualification, doctorfee, availableDay, slmcreg, practicingLocations, password, nameOfAccountHolder, accountNo, bankName, bankBranch, imgUrl } = req.body;
    
    let to=new Date(req.body.availableTimeTo)
    let from=new Date(req.body.availableTimeFrom)
    
    const availableTimeTo = (to.getHours() + ":" + to.getMinutes())
    const availableTimeFrom = (from.getHours() + ":" + from.getMinutes())

    try {
        //creating a new doctor
        const doctor = await Doctor.create({title, name, email, speciality, gender, languages, phoneno, qualification, doctorfee, availableDay, availableTimeTo, availableTimeFrom, slmcreg, practicingLocations, password, nameOfAccountHolder, accountNo, bankName, bankBranch, imgUrl });

        //creating a token
        const token = jwt.sign({name: doctor.name, id: doctor._id, slmcreg: doctor.slmcreg}, process.env.JWT_SECRET, {expiresIn: "1h"})
 
        //joining the doctor  object and token as the response
        res.status(200).json({result: doctor, token})
    }catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    } 
}

//doctor update
exports.updateDoctor = async(req,res) => {

    let doctorID = req.params.id;
    const { name, speciality, languages, qualification, doctorfee, availableDay, practicingLocations, } = req.body;

    let to=new Date(req.body.availableTimeTo)
    let from=new Date(req.body.availableTimeFrom)
    
    const availableTimeTo = (to.getHours() + ":" + to.getMinutes())
    const availableTimeFrom = (from.getHours() + ":" + from.getMinutes())

    const updateDoctor= { name, speciality, languages, qualification, doctorfee, availableDay, availableTimeTo, availableTimeFrom, practicingLocations} 
    
    try{
        //find doctor by ID  
         await Doctor.findByIdAndUpdate(doctorID ,updateDoctor);

        res.status(200).json({message:"doctor updated"})
    }catch(error){
        res.status(500).json({message:"Error with updating data",error:error.message});
    }

}

//doctor delete
exports.deleteDoctor = async(req,res) => {
    
    let doctorId = req.params.id;
    
    try{
        await Doctor.findByIdAndDelete(doctorId);

        res.status(200).json({message:"delete successful"});
    }catch(error){
        res.status(500).json({message: "delete failed",error:error.message});
    }
}

exports.fetchAll =async(req,res) =>{

    Doctor.find().then((doctors)=>{
        
        res.status(200).json(doctors)
    }).catch((error)=>{
        res.status(500).json({message:"fetching failed", error:error.message});
    })
}

exports.fetchOne =async(req,res) =>{
    let doctorId = req.params.id;

    await Doctor.findById(doctorId)
    .then( (doctor) =>{
        res.status(200).json(doctor)
    }).catch( (error) =>{
        res.status(500).json({message:"Fetching failed", error:error.message});
    })
}
