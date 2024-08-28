const express = require('express');
const router = express.Router();
const { uploadDocument, getDocuments } = require('../controllers/document');

router.post('/', uploadDocument);
router.get('/', getDocuments);

module.exports = router;