const router = require("express").Router();
const { patientsignup, patientsignin } = require('../controllers/patientcontroller.js')

//patient sign up
router.post('/patientsignup', patientsignup);

//patient sign in
router.post('/patientsignin', patientsignin);

module.exports = router;