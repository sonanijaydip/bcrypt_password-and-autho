var express = require('express');
var router = express.Router();

var user = require('../controller/usercontroller')
var check = require('../middlewear/autho')

router.post('/register',user.register_user);

router.post('/login',user.login_user);

router.get('/getlogin',check.checktoken,user.get_user);

/* GET home page. */


module.exports = router;
