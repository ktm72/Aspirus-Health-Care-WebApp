const router = require("express").Router();
const { addprescription, deleteprescription, updateprescription, viewprescription } = require('../controllers/prescriptioncontroller.js')
const {viewoneprescription} = require('../controllers/prescriptioncontroller.js')

//add new prescription
router.post('/add', addprescription);

//delete existing prescription
router.delete('/delete/:id', deleteprescription);

//update prescription
router.put('/update/:id', updateprescription);

//view prescription
router.get('/:id', viewprescription);

//view one prescription
router.get('/view/:id', viewoneprescription);

module.exports = router;
