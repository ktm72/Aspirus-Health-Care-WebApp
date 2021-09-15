const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({

  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
    require: true
  },

  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    require: true
  },
  date: {
    type: String,
    require: true
  },
  refill: {
    type: String,
    require: true
  },
  action: {
    type: String,
    require: true
  },
  medicineList: {
    type: Array,
    require: true    
  }


});

const Prescription = mongoose.model("prescription", PrescriptionSchema)
module.exports = Prescription
