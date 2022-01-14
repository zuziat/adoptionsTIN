const express = require('express');
const router = express.Router();

const animalController = require('../controllers/animalController');

router.get('/', animalController.showAnimalList);
router.get('/add', animalController.showAddAnimalForm);
router.get('/edit/:animalId', animalController.showEditAnimalForm)
router.get('/details/:animalId', animalController.showAnimalDetails);

router.post('/add', animalController.addAnimal);
router.post('/edit', animalController.updateAnimal);
router.get('/delete/:animalId', animalController.deleteAnimal);


module.exports = router;



