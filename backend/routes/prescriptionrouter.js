const router = require("express").Router();
const { addprescription, deleteprescription, updateprescription, viewprescription } = require('../controllers/prescriptioncontroller.js')

//add new prescription
router.post('/addprescription', addprescription);

//delete existing prescription
router.delete('/deleteprescription', deleteprescription);

//update prescription
router.put('/updateprescription', updateprescription);

//view prescription
router.post('/viewprescription', viewprescription);

module.exports = router;
