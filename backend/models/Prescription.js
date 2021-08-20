const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
    
    PrescriptionID: {
        type: String,
        require: true
    },
    DoctorID: {
      type: String,
      require: true
    },
    PatientID: {
      type: String,
      require: true
    },
    MedicineID: {
      type: String,
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
