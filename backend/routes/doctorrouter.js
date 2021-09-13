const router=require("express").Router();
const { signinDoctor, signupDoctor, updateDoctor, deleteDoctor } =require('../controllers/doctorcontroller.js');
const { fetchAll, fetchOne} =require('../controllers/doctorcontroller.js');

router.post('/signup',signupDoctor);

router.post('/signin',signinDoctor);

router.put('/update/:id',updateDoctor);

router.delete('/delete/:id', deleteDoctor);

router.post('/',fetchAll);

router.get('/:id',fetchOne);

module.exports = router;