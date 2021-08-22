const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    itemid : {
        type : Schema.Types.ObjectId,
        ref : 'products',
        required : true

    },
    
    patientID : {
        type : Schema.Types.ObjectId,
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