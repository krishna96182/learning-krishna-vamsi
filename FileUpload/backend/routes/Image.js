const express = require('express');
const router = express.Router();
const { uploadImage, getImages } = require('../controllers/image');

router.post('/', uploadImage);
router.get('/', getImages);

module.exports = router;