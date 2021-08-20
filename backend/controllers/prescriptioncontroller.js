const router = require("express").Router();
let Prescription = require("../models/Prescription");

//add new prescription
exports.addprescription = async(req, res) => {//insert data

  //constant variables for the attributes
  const DoctorID = req.body.DoctorID;
  const PatientID = req.body.PatientID;
  const MedicineID = req.body.MedicineID;
  const Dose = req.body.Dose;
  const Action = req.body.Action;

  //object
  const newPrescription = new Prescription({
    //initializing properties
    DoctorID,
    PatientID,
    MedicineID,
    Dose,
    Action
  })

  //exception handling
  newPrescription.save().then(() => {//saving the object to the db 
    res.json("New Prescription Added")
  }).catch(() => {
    console.log(err);
  })
}

//delete existing prescription
exports.deleteprescription = async (req, res) => {
  let PrescriptionID = req.params.id;

  await Prescription.findByIdAndDelete(PrescriptionID).then(() => {
    res.status(200).send({ status: "Prescription Deleted" });
  }).catch((errr) => {
    console.log(err.message);
    res.status(500).send({ status: "Error with Deleting Prescription", error: err.message });
  })
}

//update prescription
exports.updateprescription = async (req, res) => { //fetch id from url
  let PrescriptionID = req.params.id;

  const {DoctorID, PatientID, MedicineID, Dose, Action } = req.body;

  const updatePrescription = {
    DoctorID,
    PatientID,
    MedicineID,
    Dose,
    Action
  }
  //check whether there's a prescription for the ID
  const update = await Prescription.findByIdAndUpdate(PrescriptionID, updatePrescription).then(() => {
    res.status(200).send({ status: "User Updated" })
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ status: "Error with Updating Prescription", error: err.message });
  })
}

//view prescription
exports.viewprescription = async (req, res) => { //fetch data

  //calling Prescription model
  Prescription.find().then((prescription) => {
    res.json(prescription)
  }).catch((err) => {
    console.log(err);
  })
}
