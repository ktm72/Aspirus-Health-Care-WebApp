const router = require("express").Router();
const { adminsignin, adminsignup } = require('../controllers/admincontroller.js');

//admin sign up
router.post('/signup', adminsignup);

//admin sign in
router.post('/signin', adminsignin);

module.exports = router;