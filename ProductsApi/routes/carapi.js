var express = require('express');
var router = express.Router();

const carrentalController = require("../controllers/carapi");
router.get('/', carrentalController.index);

router.get('/:id', carrentalController.getCarrental);

router.post('/', carrentalController.createCarrental);

router.put('/:id', carrentalController.putCarrental);

router.patch('/:id', carrentalController.patchCarrental);

router.delete('/:id', carrentalController.deleteCarrental);

module.exports = router;