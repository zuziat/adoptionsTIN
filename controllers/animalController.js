const AdopterRepository = require('../repository/mysql12/AdopterRepository');
const VolunteerRepository = require('../repository/mysql12/VolunteerRepository');
const AnimalRepository = require('../repository/mysql12/AnimalRepository');
const animalSchema = require('../model/joi/Animal');

exports.showAnimalList = (req, res, next) => {
    AnimalRepository.getAnimals()
        .then(animals => {
            res.render('pages/animal/list', {
                animals: animals,
                navLocation: 'animal'
            });
        });
}

exports.showAddAnimalForm = (req, res, next) => {
    let allVols, allAdopts;
    AdopterRepository.getAdopters()
        .then(adopts => {
            allAdopts = adopts;
            return VolunteerRepository.getVolunteers()
        })
        .then(vols => {
            allVols = vols;
            res.render('pages/animal/form', {
                animal: {},
                pageTitle: 'Nowe zwierzę',
                formMode: 'createNew',
                allAdopts: allAdopts,
                allVols: allVols,
                btnLabel: 'Dodaj zwierzę',
                formAction: '/animals/add',
                navLocation: 'animal',
                validationErrors: []
            });

        });

}

exports.showEditAnimalForm = (req, res, next) => {
    let allVols, allAdopts;
    const animalId = req.params.animalId;
    AdopterRepository.getAdopters()
        .then(adopts => {
            allAdopts = adopts;
            return VolunteerRepository.getVolunteers()
        })
        .then(vols => {
            allVols = vols;
            return AnimalRepository.getAnimalByID(animalId)
        })
        .then(animal => {
            res.render('pages/animal/form', {
                animal: animal,
                allAdopts: allAdopts,
                allVols: allVols,
                formMode: 'edit',
                pageTitle: 'Edycja zwierzęcia',
                btnLabel: 'Edytuj zwierzę',
                formAction: '/animals/edit',
                navLocation: 'animal',
                validationErrors: []

            })

        });

}
exports.showAnimalDetails = (req, res, next) => {
    const animalId = req.params.animalId;
    AnimalRepository.getAnimalByID(animalId)
        .then(animal => {
            res.render('pages/animal/form', {
                animal: animal,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły zwierzęcia',
                formAction: '',
                navLocation: 'animal',
                validationErrors: []
            });
        });
}

exports.addAnimal = (req, res, next) => {

    const animalData = {...req.body};
    AnimalRepository.createAnimal(animalData)
        .then(result => {
            res.redirect('/animals');
        })
        .catch(err => {
            let allVols, allAdopts;
            AdopterRepository.getAdopters()
                .then(adopts => {
                    allAdopts = adopts;
                    return VolunteerRepository.getVolunteers()
                })
                .then(vols => {
                    res.render('pages/animal/form', {
                        animal: animalData,
                        allAdopts: allAdopts,
                        allVols: vols,
                        pageTitle: 'Dodawanie zwierzęcia',
                        formMode: 'createNew',
                        btnLabel: 'Dodaj zwierzę',
                        formAction: '/animals/add',
                        navLocation: 'animals',
                        validationErrors: err.details
                    });
                });
        });
}

exports.updateAnimal = (req, res, next) => {

    const animalId = req.body._id;
    const animalData = {...req.body};
    AnimalRepository.updateAnimal(animalId, animalData)
        .then(result => {
            res.redirect('/animals');
        })
        .catch(err => {
            let allVols, allAdopts;
            AdopterRepository.getAdopters()
                .then(adopts => {
                    allAdopts = adopts;
                    return VolunteerRepository.getVolunteers()
                })
                .then(vols => {
                    res.render('pages/animal/form', {
                        animal: animalData,
                        allAdopts: allAdopts,
                        allVols: vols,
                        pageTitle: 'Edytowanie zwierzęcia',
                        formMode: 'edit',
                        btnLabel: 'Edytuj zwierzę',
                        formAction: '/animals/edit',
                        navLocation: 'animals',
                        validationErrors: err.details
                    });
                });
        });

}

exports.deleteAnimal = (req, res, next) => {

    const animalId = req.params.animalId;
    AnimalRepository.deleteAnimal(animalId)
        .then(() => {
            res.redirect('/animals');
        });
}



