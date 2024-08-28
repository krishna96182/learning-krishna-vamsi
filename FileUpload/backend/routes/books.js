var express = require('express');
var router = express.Router();
const booksController = require("../controllers/books");
/* GET users listing. */
router.post("/", booksController.createBook);
router.get('/', booksController.getBooksWithAuthors);
module.exports = router;