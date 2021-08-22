const router = require("express").Router();
let Appointment = require("../models/Appointment");

//add new appointment
exports.addAppointment = async (req, res)=>{
    //constant variables for attributes
    const patientID = req.body.patientID;
    const doctorID = req.body.doctorID;
    const time = req.body.time;
    const date = req.body.date;

    //object
    const newAppointment = new Appointment({
        //initializing properties
        patientID,
        doctorID,
        time,
        date
    })

    //exception handling
    newAppointment.save().then(() => {
        //saving the object to the db
        res.status(200).json({success:true, message:"Appointment was created"})
    }).catch((error) => {
        res.status(500).json({success:false, message:"Creating Appointment failed",error:error.message})
    })
}

//update appointment
exports.updateAppointment = async (req, res) => {
    //fetch id from url
    let appointmentID = req.params.id;

    const {time,date} = req.body;

    const updateAppointment = {
        time,
        date
    }
    
    //check whether there's a appointment for the ID
    try {
        await Appointment.findByIdAndUpdate(appointmentID,updateAppointment);

        //sending the successful status
        res.status(200).json({success:true, message:"Appointment updated"})
    }catch (error) {
        res.status(500).json({success:false, message:"Updating Appointment is failed",error: error.message})
    }
}

//view appointments
exports.viewAppointment = async (req, res) => {

    //calling Appointments model
    Appointment.find().then((appointments) => {
        res.status(200).json(appointments)
    }).catch((error) => {
        res.status(500).json({success:false, message: "Fetching appointment failed", error: error.message });
    })
}

//view one appointment
exports.viewOneAppointment = async (req, res) => {
    let appointmentID = req.params.id;

    await Appointment.findById(appointmentID).then((appointment) => {
        res.status(200).json({success: true, result:appointment});
    }).catch((error) =>{
        res.status(500).json({success:false, status: "Fetching appointment failed", error: error.message });
    })
}

//delete existing appointment
exports.deleteAppointment = async(req, res) =>{
    let appointmentID = req.params.id;
  
    await Appointment.findByIdAndDelete(appointmentID).then(() => {
      res.status(200).json({success:true, message: "Appointment Deleted" });
    }).catch((error) => {
      res.status(500).send({success:false, message: "Deleting Appointment failed", error: error.message });
    })
  }


