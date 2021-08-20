const router = require("express").Router();
const { addprescription, deleteprescription, updateprescription, viewprescription, viewoneprescription } = require('../controllers/prescriptioncontroller.js')

//add new prescription
router.post('/add', addprescription);

//delete existing prescription
router.delete('/delete/:id', deleteprescription);

//update prescription
router.put('/update/:id', updateprescription);

//view prescription
router.get('/', viewprescription);

//view one prescription
router.get('/get/:id', viewoneprescription);

module.exports = router;
