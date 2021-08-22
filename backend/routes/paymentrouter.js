const router=require("express").Router();
const{ addPayment ,updatePayment ,deletePayment }=require('../controllers/paymentcontroller.js');
const{ fetchAll, fetchOne }=require('../controllers/paymentcontroller.js');

router.post('/add', addPayment);

router.put('/update/:id', updatePayment);

router.delete('/delete/:id',deletePayment);

router.post('/',fetchAll);

router.post('/:id',fetchOne);

module.exports =router;