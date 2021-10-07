const Cart = require('../models/Cart');


//add item
exports.additem = async(req,res) => {
    const {itemid,patientID,quantity,type,total} = req.body;

    try {
        //checking product already exists
        const checkItem = await Cart.findOne({itemid,patientID})
        if(checkItem)
            return res.status(409).json({message: "Item already exists"})

        //creating a new add item
        await Cart.create({itemid,patientID,quantity,type,total});
        //success message
        res.status(200).json({success: true,message:"Item add to cart"})

    } catch (error) {
        //error message
        res.status(500).json({message: "can't added", error: error.message})
    }
}

//update item
exports.updateitem = async(req,res) => {
    //get cart id
    let cartId = req.params.id;

    const quantity = Number(req.body.quantity);
    const Price = Number(req.body.price);

    let total = Price * quantity;

    const updateCart = {quantity,total}
    
    try {
        //find a item by ID for update
        await Cart.findByIdAndUpdate(cartId,updateCart);
        //success message
        res.status(200).json({success: true,message:"Quantity updated"})

    }catch(error){
        //error message
        res.status(500).json({message: "failed to update", error: error.message})
    }
}

//delete item
exports.deleteitem = async(req,res) => {
    let cartId = req.params.id;

    try {
        //find a item by ID for delete
        await Cart.findByIdAndDelete(cartId);
        //success message
        res.status(200).json({success: true,message:"Item Deleted"})

    }catch(error){
        //error message
        res.status(500).json({message: "can't delete", error: error.message})
    }
}

//view cart
exports.viewCart = async(req,res) => {
    //get patient id
    let patientID = req.params.id;
    //get cart type( Shopping or prescription )
    let type = req.params.type;

    try {
        //find cart by patient id and cart
        const cart = await Cart.find({patientID,type}).populate(
            {path:'itemid', select:['name','price','description','total','imgUrl']});
        //success message
        res.status(200).json({success: true,result:cart})
    }catch(error){
        //error message
        res.status(500).json({message: "Error with fetching product", error: error.message})
    }
}

//view one cart
exports.viewOneCart = async(req,res) => {
    //get cart id
    let cartID = req.params.id;

    try {
        //find cart by patient id and cart
        const cart = await Cart.findById(cartID)            
        //success message
        res.status(200).json({success: true,result:cart})
    }catch(error){
        //error message
        res.status(500).json({message: "Error with fetching cart", error: error.message})
    }
}

