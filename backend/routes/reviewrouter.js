const router=require("express").Router();
const{ createReview ,updateReview ,deleteReview }=require('../controllers/reviewcontroller.js');
const{ fetchAll , fetchOne }=require('../controllers/reviewcontroller.js');

router.post('/create', createReview);

router.put('/update/:id', updateReview);

router.delete('/delete/:id',deleteReview);

router.post('/',fetchAll);

router.post('/:id',fetchOne);

module.exports =router;