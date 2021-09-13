const router = require("express").Router();
const { addProduct, deleteProduct, updateProduct,viewAllProducts, viewOneProduct, viewOtcProducts } = require('../controllers/productcontroller.js')
 
//add new product
router.post('/add', addProduct);
 
//delete existing product
router.delete('/delete/:id', deleteProduct);
 
//update product
router.put('/update/:id', updateProduct);
 
//view all products
router.get('/',viewAllProducts);

//view OTC products
router.get('/OTC',viewOtcProducts);

//view one product
router.get('/item/:id', viewOneProduct);
 
module.exports = router;