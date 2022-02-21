const express = require('express');
const router = express.Router();

const adoptApiController = require('../../api/AdopterAPI');

router.get('/', adoptApiController.getAdopters);
router.get('/:adoptId', adoptApiController.getAdopterByID);
router.post('/', adoptApiController.createAdopter);
router.put('/:adoptId', adoptApiController.updateAdopter);
router.delete('/:adoptId', adoptApiController.deleteAdopter);

module.exports = router;