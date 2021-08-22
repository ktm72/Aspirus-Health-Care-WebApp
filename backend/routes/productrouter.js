const router = require("express").Router();
const { addProduct, deleteProduct, updateProduct, viewProduct, viewOneProduct } = require('../controllers/productcontroller.js')
 
//add new product
router.post('/add', addProduct);
 
//delete existing product
router.delete('/delete/:id', deleteProduct);
 
//update product
router.put('/update/:id', updateProduct);
 
//view product
router.get('/', viewProduct);
 
//view one product
router.get('/:id', viewOneProduct);
 
module.exports = router;