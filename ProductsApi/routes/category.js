var express = require('express');
var router = express.Router();
const categoryController = require("../controllers/category");
/* GET users listing. */
router.post("/categories", categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);
module.exports = router;