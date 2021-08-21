const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
    

    doctorID: {
      type: Schema.Types.ObjectId,
      ref:'doctor',
      require: true
    },
    patientID: {
      type: Schema.Types.ObjectId,
      ref:'patient',
      require: true
    },
    productID: {
      type: Schema.Types.ObjectId,
      ref:'product',
      require: true
    },  
    dose: {
      type: String,
      require: true
    },
    action: {
      type: String,
      require: true
    }    

  });

const Prescription = mongoose.model("Prescription",PrescriptionSchema)

module.exports = Prescription
