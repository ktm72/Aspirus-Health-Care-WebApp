const router = require("express").Router();
const {additem, updateitem, deleteitem, viewCart} = require('../controllers/cartcontroller.js')


router.post('/add', additem);

router.put('/update/:id', updateitem);

router.delete('/delete/:id', deleteitem);

router.get('/:id&:type', viewCart);



module.exports = router;