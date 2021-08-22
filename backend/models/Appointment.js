const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    patientID: {
        type: Schema.Types.ObjectId,
        ref:'patient',
        require: true
    },

    doctorID: {
        type: Schema.Types.ObjectId,
        ref:'doctor',
        require: true
    },
    
    time: {
        type: String,
        require: true
    },

    date: {
        type: String,
        require: true
    }

});

const Appointment = mongoose.model("appointment",AppointmentSchema)
module.exports = Appointment