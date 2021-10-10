const router = require("express").Router();
let Appointment = require("../models/Appointment");

//add new appointment
exports.addAppointment = async (req, res) => {
  //constant variables for attributes
  const patientID = req.body.patientID;
  const doctorID = req.body.doctorID;
  const paymentID = req.body.paymentID;

  let to = new Date(req.body.time)
  const time = (to.getHours() + ":" + to.getMinutes())

  let today = new Date(req.body.date);
  const date = ( today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() )

  //object
  const newAppointment = new Appointment({
    //initializing properties
    patientID,
    doctorID,
    paymentID,
    time,
    date
  })

  //exception handling
  newAppointment.save().then(() => {
    //saving the object to the db
    res.status(200).json({ success: true, message: "Appointment was created" })
  }).catch((error) => {
    res.status(500).json({ success: false, message: "Creating Appointment failed", error: error.message })
  })
}

//update appointment
exports.updateAppointment = async (req, res) => {
  //fetch id from url
  let appointmentID = req.params.id;

  let to = new Date(req.body.time)
  const time = (to.getHours() + ":" + to.getMinutes())

  const today = new Date(req.body.date)
  const date = ( today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() )
  

  const updateAppointment = {
    time,
    date
  }

  //check whether there's a appointment for the ID
  try {
    await Appointment.findByIdAndUpdate(appointmentID, updateAppointment).populate(
      { path: 'patientID doctorID', select: ['firstname', 'lastname', 'name'] });


    //sending the successful status
    res.status(200).json({ success: true, message: "Appointment updated" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Updating Appointment is failed", error: error.message })
  }
}

//view appointments
exports.viewAppointment = async (req, res) => {
    //get patient id
    let patientID = req.params.id;
    let doctorID = req.params.id;
  
    try {
      //find appointment by patient id
      const appointment = await Appointment.find({ $or: [{ patientID }, { doctorID }] }).populate(
        { path: 'patientID doctorID', select: ['firstname', 'lastname', 'name',  'title','slmcreg'] });
      //success message
      res.status(200).json({ success: true, result: appointment })
      
    } catch (error) {
      //error message
      res.status(500).json({ message: "fetching Appointment failed", error: error.message })
    }
}

//view one appointment
exports.viewOneAppointment = async (req, res) => {
  let appointmentID = req.params.id;

    await Appointment.findById(appointmentID).populate(
      { path: 'patientID doctorID', select: ['firstname', 'lastname', 'name',  'title','slmcreg', 'speciality', 'gender', 'languages', 'doctorfee', 'availableTimeFrom', 'availableTimeTo', 'availableDay' , 'imgUrl'] }).then((appointment) => {
        res.status(200).json({success: true, result:appointment});
    }).catch((error) =>{
        res.status(500).json({success:false, status: "Fetching appointment failed", error: error.message });
    })
}

//delete existing appointment
exports.deleteAppointment = async (req, res) => {
  let appointmentID = req.params.id;

  await Appointment.findByIdAndDelete(appointmentID).then(() => {
    res.status(200).json({ success: true, message: "Appointment Deleted" });
  }).catch((error) => {
    res.status(500).send({ success: false, message: "Deleting Appointment failed", error: error.message });
  })
}


