const Payment = require("../models/Payment");

//Add a payment
exports.addPayment = async(req,res) => {
    const{ patientID,amount,creditCardNumber } = req.body; 
    const date = new Date(); 
    try{
        //creating a new payment
        const payment = await Payment.create({patientID, amount, creditCardNumber,date});

        
        res.status(200).json ({success:true,message:"review added"})
     }catch(error){
         res.status(500).json({message: "unable to add the payment",error:error.message});
     }
}

//update payment details
exports.updatePayment = async(req,res)=>{
    let paymentID=req.params.id;
    const{ amount, creditCardNumber} =req.body;
    const date = new Date(); 
    const updatePayment={ amount, creditCardNumber, date}

    try{
        //find review by patient ID
        await Payment.findByIdAndUpdate(paymentID,updatePayment);

        res.status(200).json({message: "payment updated"})
    }catch(error){
        res.status(500).json({message:"Error with updating the payment details",error:error.message});

    }
 }

//delete payment details
exports.deletePayment= async(req,res)=>{

    let paymentID =req.params.id;

    try{
        await Payment.findByIdAndDelete(paymentID);

        res.status(200).json({message:"delete successful"});
    }catch(error){
        res.status(500).json({message:"delete unsuccessful",error:error.message});
    }
}
//fetching all payments
exports.fetchAll = async(req,res)=>{
    Payment.find().then((payments)=>{

        res.status(200).json(payments)
    }).catch((error)=>{
        res.status(500).json({message:"fetching failed",error:error.message});
    })

}

exports.fetchOne = async(req,res)=>{
    let paymentID =req.params.id;

    await Payment.findById(paymentID)
    .then((payment)=>{
        res.status(200).json(payment)

    }).catch((error)=>{
        res.status(500).json({message:"fetching failed",error:error.message});
    })
}