const AdopterRepository = require('../repository/mysql12/AdopterRepository');
const adoptSchema = require('../model/joi/Adopter');

exports.showAdopterList = (req, res, next) => {
    AdopterRepository.getAdopters()
        .then(adopters => {
            res.render('pages/Adopter/list', {
                adopters: adopters,
                navLocation: 'Adopters'
            });
        });

};
exports.showAddAdopterForm = (req, res, next) => {
    res.render('pages/Adopter/form', {
        adopter: {},
        pageTitle: 'Nowy adoptujący',
        formMode: 'createNew',
        btnLabel: 'Dodaj adoptującego',
        formAction: '/Adopters/add',
        navLocation: 'Adopters',
        validationErrors: []
    });
};
exports.showEditAdopterForm = (req, res, next) => {
    const adoptId = req.params.adoptId;
    AdopterRepository.getAdopterByID(adoptId)
        .then(adopt => {
            res.render('pages/Adopter/form', {
                adopter: adopt,
                formMode: 'edit',
                pageTitle: 'Edycja adoptującego',
                btnLabel: 'Edytuj adoptującego',
                formAction: '/Adopters/edit',
                navLocation: 'Adopters',
                validationErrors: []
            });
        });

};
exports.showAdopterDetails = (req, res, next) => {
    const adoptId = req.params.adoptId;
    AdopterRepository.getAdopterByID(adoptId)
        .then(adopt => {
            res.render('pages/Adopter/form', {
                adopter: adopt,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły adoptującego',
                formAction: '',
                navLocation: 'Adopters',
                validationErrors: []
            });
        });

}

exports.addAdopter = (req, res, next) => {

    const adoptData = {...req.body};
    AdopterRepository.createAdopter(adoptData)
        .then(result => {
            res.redirect('/Adopters');
        })
        .catch(err => {
            res.render('pages/Adopter/form', {
                adopter: adoptData,
                pageTitle: 'Dodawanie adoptującego',
                formMode: 'createNew',
                btnLabel: 'Dodaj adoptującego',
                formAction: '/Adopters/add',
                navLocation: 'Adopters',
                validationErrors: err.details
            });
        });

}

exports.updateAdopter = (req, res, next) => {

    const adoptId = req.body._id;
    const adoptData = {...req.body};
    AdopterRepository.updateAdopter(adoptId, adoptData)
        .then(result => {
            res.redirect('/Adopters');
        })
        .catch(err => {
            AdopterRepository.getAdopterByID(adoptId)
                .then(adopt => {
                    res.render('pages/Adopter/form', {
                        adopter: adopt,
                        pageTitle: 'Edytowanie adoptującego',
                        formMode: 'edit',
                        btnLabel: 'Edytuj adoptującego',
                        formAction: '/Adopter/edit',
                        navLocation: 'Adopters',
                        validationErrors: err.details
                    });
                });

        });


}

exports.deleteAdopter = (req, res, next) => {

    const adoptId = req.params.adoptId;
    AdopterRepository.deleteAdopter(adoptId)
        .then(() => {
            res.redirect('/Adopters');
        });
}
