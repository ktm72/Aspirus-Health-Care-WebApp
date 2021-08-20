const router = require("express").Router();
const { addprescription, deleteprescription, updateprescription, viewprescription } = require('../controllers/prescriptioncontroller.js')

//add new prescription
router.post('/add', addprescription);

//delete existing prescription
router.delete('/delete', deleteprescription);

//update prescription
router.put('/update', updateprescription);

//view prescription
router.get('/', viewprescription);

module.exports = router;
