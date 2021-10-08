const router = require("express").Router();
const {additem, updateitem, deleteitem, viewCart, viewOneCart} = require('../controllers/cartcontroller.js')
const patientauth = require('../middleware/patientauth');

router.post('/add',patientauth, additem);

router.put('/update/:id',patientauth, updateitem);

router.delete('/delete/:id',patientauth, deleteitem);

router.get('/:id&:type', viewCart);

router.get('/:id', viewOneCart);

module.exports = router;