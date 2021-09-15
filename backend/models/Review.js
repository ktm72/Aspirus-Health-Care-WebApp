const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const ReviewSchema=new Schema({
   
    patientID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient',
        required:true
    },
    feedback:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required:true
    }

})

const Review=mongoose.model("review",ReviewSchema);
module.exports=Review;