const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    paymentID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'payment',
        required : true

    },
    
    patientID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'patient',
        required : true
    },

    itemList : {
        type : Array,
        required : true
    }

})

const Order = mongoose.model("order",OrderSchema)
module.exports = Order