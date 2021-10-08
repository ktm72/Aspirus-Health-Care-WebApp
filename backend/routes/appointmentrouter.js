const router = require("express").Router();
const { addAppointment, updateAppointment, viewAppointment, deleteAppointment } = require('../controllers/appointmentcontroller.js')
const { viewOneAppointment } = require('../controllers/appointmentcontroller.js')

//add new appointment
router.post('/add', addAppointment);

//update existing appointment
router.put('/update/:id', updateAppointment);

//view appointment
router.get('/:id', viewAppointment);

//view one appointment
router.get('/view/:id', viewOneAppointment);

//delete appointment
router.delete('/delete/:id', deleteAppointment);

module.exports = router;
