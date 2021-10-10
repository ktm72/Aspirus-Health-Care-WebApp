const router = require("express").Router();
const {addOrder,viewOrder} = require('../controllers/ordercontroller.js')
const patientauth = require('../middleware/patientauth');

router.post('/add',patientauth, addOrder);
router.get('/:id', viewOrder);
module.exports = router;