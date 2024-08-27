var express = require('express');
var router = express.Router();
const userController = require("../controllers/users");
/* GET users listing. */
router.get("/", userController.index);
router.post('/', userController.createUser);
router.post('/login', userController.login);
module.exports = router;