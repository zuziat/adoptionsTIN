const AnimalRepository = require('../repository/mysql12/AnimalRepository');

exports.getAnimals = (req, res, next) => {
    AnimalRepository.getAnimals()
        .then(animals => {
            res.status(200).json(animals);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAnimalByID = (req, res, next) => {
    const animalId = req.params.animalId;
    AnimalRepository.getAnimalByID(animalId)
        .then(animal => {
            if (!animal) {
                res.status(404).json({
                    message: 'Animal with id: ' + animalId + ' not found'
                })
            } else {
                res.status(200).json(animal);
            }
        });
};

exports.createAnimal = (req, res, next) => {
    AnimalRepository.createAnimal(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateAnimal = (req, res, next) => {
    const animalId = req.params.animalId;
    AnimalRepository.updateAnimal(animalId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Animal updated!', animal: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteAnimal = (req, res, next) => {
    const animalId = req.params.animalId;
    AnimalRepository.deleteAnimal(animalId)
        .then(result => {
            res.status(200).json({ message: 'Removed Animal', animal: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};