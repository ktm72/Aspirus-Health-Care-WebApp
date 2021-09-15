const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    itemid : {
        type : mongoose.Schema.Types.ObjectId,//new added
        ref : 'product',
        required : true

    },
    
    patientID : {
        type : mongoose.Schema.Types.ObjectId,//new added
        ref : 'patient',
        required : true
    },

    quantity : {
        type : Number,
        required : true
    },

    type : {
        type : String,
        required : true
    }


})

const Cart = mongoose.model("cart",CartSchema)
module.exports = Cart