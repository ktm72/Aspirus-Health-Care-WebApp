const Order = require('../models/Order');


//add Order
exports.addOrder = async(req,res) => {
    const {paymentID,patientID,itemList} = req.body;
    try {
        //creating a new add order
        await Order.create({paymentID,patientID,itemList});
        //success message
        res.status(200).json({success: true,message:"Order placed"})

    } catch (error) {
        //error message
        res.status(500).json({message: "Order can't placed", error: error.message})
    }
}

exports.viewOrder = async(req,res) => {
    //get patient id
    let patientID = req.params.id;
   
    try {
        //find oder by patient id and order
        const order = await Order.find({patientID}).populate(
            {path:'itemId paymentID', select:['name','imgUrl','amount']});
        //success message
        res.status(200).json({success: true,result:order})
    }catch(error){
        //error message
        res.status(500).json({message: "Error with fetching orders", error: error.message})
    }
}