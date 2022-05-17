var express = require('express');
var router = express.Router();

var user = require('../controllers/userController');
/* GET home page. */
router.get('/',user.test);
router.post('/register',user.register);
router.post('/login',user.login);
router.post('/getSalt',user.getUserSalt);
router.post('/userInfo',user.getUserInfoById)
router.post('/userInfo/update',user.updateUserInfo)
router.post('/updatePassword',user.updatePassword)

module.exports = router;
