const router = require("express").Router();
let Prescription = require("../models/Prescription");

//add new prescription
exports.addprescription = async (req, res) => {
  //constant variables for the attributes
  const doctorName = req.body.doctorName;  
  const doctorID = req.body.doctorID;
  const patientName = req.body.patientName;  
  const patientID = req.body.patientID;
  const date = req.body.date;
  const productTitle = req.body.productTitle;
  const dose = req.body.dose;
  const disp = req.body.disp;
  const sig = req.body.sig;  
  const refill = req.body.refill;
  const action = req.body.action;

  //object
  const newPrescription = new Prescription({
    //initializing properties
    doctorName,
    doctorID,
    patientName,
    patientID,
    date,
    productTitle,
    dose,
    disp,
    sig,
    refill,
    action
  })

  //exception handling
  newPrescription.save().then(() => {
    //saving the object to the db 
    
    res.status(200).json({success:true, message: "New Prescription Added"})//success message
  }).catch((error) => {
    //error message
    res.status(500).json({success:false, message: "Adding Prescription failed", error: error.message})
  })
}

//delete existing prescription
exports.deleteprescription = async (req, res) => {
  let prescriptionID = req.params.id;

  await Prescription.findByIdAndDelete(prescriptionID).then(() => {
    //success message
    res.status(200).json({success:true, message: "Prescription Deleted" });
  }).catch((error) => {
    //error message
    res.status(500).send({success:false, message: "Deleting Prescription failed", error: error.message });
  })
}

//update prescription
exports.updateprescription = async (req, res) => { 
  //fetch id from url
  let prescriptionID = req.params.id;

  const { doctorName, doctorID, patientName, patientID, producTitle, dose, disp, sig, refill, action } = req.body;

  const updatePrescription = {
    doctorName,
    doctorID,
    patientName,
    patientID,
    producTitle,
    dose,
    disp,
    sig,
    refill,
    action
  }
  //check whether there's a prescription for the ID
  try {
    await Prescription.findByIdAndUpdate(prescriptionID, updatePrescription);

    //sending the successful status
    res.status(200).json({success: true, message: "Prescription Updated" })
  } catch (error) {
    //error message
    res.status(500).json({success:false, message: "Updating Prescription failed", error: error.message });
  }
}

//view prescription
//fetch data
exports.viewprescription = async(req,res) => {
  //get patient id
  let patientID = req.params.id;

  try {
      //find Prescription by patient id
      const prescription = await Prescription.find({patientID});
      //success message
      res.status(200).json({success: true, result:prescription})
  }catch(error){
      //error message
      res.status(500).json({message: "fetching Prescription failed", error: error.message})
  }
}

//view one prescription
exports.viewoneprescription = async (req, res) => {
  let prescriptionID = req.params.id;

  await Prescription.findById(prescriptionID).then((prescription) => {
    //success message
    res.status(200).json({success: true, status: "Prescription fetched", prescription });
  }).catch((error) => {
    //error message
    res.status(500).json({success:false, status: "Fetching Prescription failed", error: error.message });
  })
}
