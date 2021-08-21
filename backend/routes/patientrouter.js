const router = require("express").Router();
const patientauth = require('../middleware/patientauth');
const { patientsignup, patientsignin, updatePatient, deletePatient} = require('../controllers/patientcontroller.js');
const { forgotPassword, resetPassword } = require('../controllers/patientcontroller.js')

//patient sign up
router.post('/signup', patientsignup);

//patient sign in
router.post('/signin', patientsignin);

//patient update profile
router.put('/updateprofile/:id', patientauth, updatePatient);

//patient delete profile
router.delete('/deleteprofile/:id', patientauth, deletePatient);

//patient forgotPassword
router.post('/forgotpassword', forgotPassword);

//patient resetPassword
router.put('/resetpassword/:resetPasswordToken', resetPassword);


module.exports = router;