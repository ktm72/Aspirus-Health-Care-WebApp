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
        console.log(error)
    }
}