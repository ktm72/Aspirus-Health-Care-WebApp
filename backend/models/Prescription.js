const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
    

    DoctorID: {
      type: Schema.Types.ObjectId,
      ref:'doctor',
      require: true
    },
    PatientID: {
      type: Schema.Types.ObjectId,
      ref:'patient',
      require: true
    },
    MedicineID: {
      type: Schema.Types.ObjectId,
      ref:'medicine',
      require: true
    },  
    Dose: {
      type: String,
      require: true
    },
    Action: {
      type: String,
      require: true
    }    

  });

const Prescription = mongoose.model("Prescription",PrescriptionSchema)

module.exports = Prescription
