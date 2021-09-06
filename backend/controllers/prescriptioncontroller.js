const router = require("express").Router();
let Prescription = require("../models/Prescription");

//add new prescription
exports.addprescription = async (req, res) => {
    //constant variables for the attributes
  const doctorID = req.body.doctorID;
  const patientID = req.body.patientID;
  const productID = req.body.productID;
  const dose = req.body.dose;
  const action = req.body.action;

  //object
  const newPrescription = new Prescription({
    //initializing properties
    doctorID,
    patientID,
    productID,
    dose,
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

  const { doctorID, patientID, productID, dose, action } = req.body;

  const updatePrescription = {
    doctorID,
    patientID,
    productID,
    dose,
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
//exports.viewprescription = async (req, res) => {
  //get patient id 
 // let patientID = req.params.id;
  //find  patient id and prescription
 //   await Prescription.findById(patientID).then((prescription) => {
      //success message
 //     res.status(200).json({success: true, status: "Prescription fetched", prescription });
//}).catch((error) => {
       //error message
 //     res.status(500).json({success:false, status: "Fetching Prescription failed", error: error.message });
//    })
//  }


//view prescription
//fetch data
exports.viewprescription = async (req, res) => { 

  //calling Prescription model
  Prescription.find().then((prescription) => {
    res.status(200).json(prescription)
  }).catch((error) => {
    res.status(500).json({success:false, message: "Fetching Prescription failed", error: error.message });
  })
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

