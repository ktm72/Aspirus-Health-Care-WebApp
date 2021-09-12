const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({

  doctorName: {
    type: String,
    require: true
  },
  doctorID: {
    type: Schema.Types.ObjectId,
    ref: 'doctor',
    require: true
  },
  patientName: {
    type: String,
    require: true
  },
  patientID: {
    type: Schema.Types.ObjectId,
    ref: 'patient',
    require: true
  },
  date: {
    type: String,
    require: true
  },
  productTitle: {
    type: String,
    require: true
  },
  dose: {
    type: String,
    require: true
  },
  disp: {
    type: String,
    require: true
  },
  sig: {
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
  }

});

const Prescription = mongoose.model("prescription", PrescriptionSchema)
module.exports = Prescription
