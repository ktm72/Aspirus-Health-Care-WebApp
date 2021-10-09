const router = require("express").Router();
const {addOrder} = require('../controllers/ordercontroller.js')
const patientauth = require('../middleware/patientauth');

router.post('/add',patientauth, addOrder);
module.exports = router;