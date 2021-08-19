const router = require("express").Router();
const patientauth = require('../middleware/patientauth');
const { patientsignup, patientsignin, updatePatient, deletePatient } = require('../controllers/patientcontroller.js')

//patient sign up
router.post('/patientsignup', patientsignup);

//patient sign in
router.post('/patientsignin', patientsignin);

//patient update profile
router.put('/updatepatient', patientauth, updatePatient);

//patient delete profile
router.delete('/deletpatient', patientauth, deletePatient);

module.exports = router;