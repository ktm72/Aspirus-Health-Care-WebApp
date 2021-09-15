const router = require("express").Router();
const {additem, updateitem, deleteitem, viewCart} = require('../controllers/cartcontroller.js')
const patientauth = require('../middleware/patientauth');

router.post('/add',patientauth, additem);

router.put('/update/:id',patientauth, updateitem);

router.delete('/delete/:id',patientauth, deleteitem);

router.get('/:id&:type', viewCart);



module.exports = router;