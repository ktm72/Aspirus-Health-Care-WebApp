const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const PaymentSchema=new Schema({
    
    patientID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'patient',
        required:true
    },

    amount:{
        type:Number,
        required: true
    },
    creditCardNumber:{
        type:String,
        required:true,
        //validate credit card number
        match:/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
       
    },
    cvv:{
        type:String,
        //validate cvv
        match:/^[0-9]{3,4}$/,

    },
    date:{
        type:String,
        required:true, 
    }

})

const Payment=mongoose.model("payment",PaymentSchema);
module.exports=Payment;