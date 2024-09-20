const express = require('express');
const router = express.Router();
const { register, login,getProviders,getAllProviders } = require('../controllers/authController');

// Register User
router.post('/register', register);

// Login User
router.post('/login', login);

router.get('/providers', getProviders);
router.get('/providers/all', getAllProviders);
module.exports = router;
