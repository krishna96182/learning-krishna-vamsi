var express = require("express");
var router = express.Router();

const authorsController = require("../controllers/authors");
router.post("/", authorsController.createAuthor);
router.get("/", authorsController.index);
router.delete("/:id", authorsController.deleteAuthor);
router.put("/:id", authorsController.putAuthor);
router.get("/login", authorsController.getAuthors);
module.exports=router;