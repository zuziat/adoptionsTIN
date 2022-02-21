const express = require('express');
const router = express.Router();

const adoptApiController = require('../../api/AnimalAPI');

router.get('/', adoptApiController.getAnimals);
router.get('/:animalId', adoptApiController.getAnimalByID);
router.post('/', adoptApiController.createAnimal);
router.put('/:animalId', adoptApiController.updateAnimal);
router.delete('/:animalId', adoptApiController.deleteAnimal);

module.exports = router;