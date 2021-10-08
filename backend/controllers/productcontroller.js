const Product = require("../models/Product");

//add new product
exports.addProduct = async (req, res) => {
 
  //constant variables for the attributes
  const {name, description, type, price,imgUrl} = req.body;
 
  //object
  const newProduct= new Product({
    //initializing properties
    name,     
    description, 
    type, 
    price,
    imgUrl
  })
 
  //saving the object to the db 
  newProduct.save().then(() => {
    res.status(200).json({ status: "New Product Added" });
  }).catch((error) => {
    res.status(500).json({message:"Fail to Add Item",error:error.message})
  })
}

//delete existing product
exports.deleteProduct = async (req, res) => {
  let productId = req.params.id;
 
  await Product.findByIdAndDelete(productId).then(() => {
    res.status(200).json({ status: "Product Deleted" });
  }).catch((error) => {
    res.status(500).json({ status: "Error with Deleting Product", error: error.message });
  })
}
 
//update Product
exports.updateProduct = async (req, res) => { 
  //fetch id from url
  let productId = req.params.id;
 
  const {name, description,type, price,imgUrl} = req.body;
 
  const updateProduct = {
    name,
    description,
    type,
    price,
    imgUrl   
  }

  //check whether there's a product for the ID
  try {
    await Product.findByIdAndUpdate(productId, updateProduct);

    //sending the successful status
    res.status(200).json({ success: true, message: "Product Updated" })
  } catch (error) {
    res.status(500).json({ message: "Error with Updating Product", error: error.message });
  }
}

//view Product
exports.viewAllProducts = async (req, res) => { 
 
  //calling Product model
  Product.find().then((product) => {
    res.status(200).json(product)
  }).catch((error) => {
    res.status(500).json({ message: "Error with fetching Product", error: error.message });
  })
}
 

//view Only OTC Products
exports.viewOtcProducts = async(req,res) => {

  let type = "OTC"
  try {
      //find type by product id and type
      const product = await Product.find({type});
      //success message
      res.status(200).json({success: true,result:product})
  }catch(error){
      //error message
      res.status(500).json({message: "Error with fetching product", error: error.message})
  }
}


//view oneProduct
exports.viewOneProduct = async (req, res) => {
  let productId = req.params.id;

  await Product.findById(productId).then((product) => {
    res.status(200).json({ status: "Product fetched", product });
  }).catch((error) => {
    res.status(500).json({ status: "Error with fetching product", error: error.message });
  })
}