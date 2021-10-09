const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    required: true
  },

  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
    required: true
  },

  paymentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'payment',
    required: true
  },

  time: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  }


});

const Appointment = mongoose.model("appointment", AppointmentSchema)
module.exports = Appointment
