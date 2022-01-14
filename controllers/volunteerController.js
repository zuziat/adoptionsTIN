const VolunteerRepository = require('../repository/mysql12/VolunteerRepository')
const volSchema = require('../model/joi/Volunteer');

exports.showVolunteerList = (req, res, next) => {
    VolunteerRepository.getVolunteers()
        .then(volunteers => {
            res.render('pages/volunteer/list', {
                volunteers: volunteers,
                navLocation: 'volunteers'
            });
        });

}
exports.showAddVolunteerForm = (req, res, next) => {
    res.render('pages/volunteer/form', {
        volunteer: {},
        pageTitle: 'Nowy wolontariusz',
        formMode: 'createNew',
        btnLabel: 'Dodaj wolontariusza',
        formAction: '/volunteers/add',
        navLocation: 'volunteers',
        validationErrors: []
    });
}
exports.showEditVolunteerForm = (req, res, next) => {
    const volId = req.params.volId;
    VolunteerRepository.getVolunteerByID(volId)
        .then(vol => {
            res.render('pages/volunteer/form', {
                volunteer: vol,
                formMode: 'edit',
                pageTitle: 'Edycja wolontariusza',
                btnLabel: 'Edytuj wolontariusza',
                formAction: '/volunteers/edit',
                navLocation: 'volunteers',
                validationErrors: []
            });
        });

}
exports.showVolunteerDetails = (req, res, next) => {
    const volId = req.params.volId;
    VolunteerRepository.getVolunteerByID(volId)
        .then(vol => {
            res.render('pages/volunteer/form', {
                volunteer: vol,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły wolontariusza',
                formAction: '',
                navLocation: 'volunteers',
                validationErrors: []
            });
        });

}

exports.addVolunteer = (req, res, next) => {

    const volData = {...req.body};
    VolunteerRepository.createVolunteer(volData)
        .then(result => {
            res.redirect('/volunteers');
        })
        .catch(err => {
            res.render('pages/volunteer/form', {
                volunteer: volData,
                pageTitle: 'Dodawanie wolontariusza',
                formMode: 'createNew',
                btnLabel: 'Dodaj wolontariusza',
                formAction: '/volunteers/add',
                navLocation: 'volunteers',
                validationErrors: err.details
            });
        });
}

exports.updateVolunteer = (req, res, next) => {

    const volId = req.body._id;
    const volData = {...req.body};
    VolunteerRepository.updateVolunteer(volId, volData)
        .then(result => {
            res.redirect('/volunteers');
        })
        .catch(err => {
            VolunteerRepository.getVolunteerByID(volId)
                .then(vol => {
                    res.render('pages/volunteer/form', {
                        volunteer: vol,
                        pageTitle: 'Edytowanie wolontariusza',
                        formMode: 'edit',
                        btnLabel: 'Edytuj wolontariusza',
                        formAction: '/volunteers/edit',
                        navLocation: 'volunteers',
                        validationErrors: err.details
                    });
                });
        });

}

exports.deleteVolunteer = (req, res, next) => {

    const volId = req.params.volId;
    VolunteerRepository.deleteVolunteer(volId)
        .then(() => {
            res.redirect('/volunteers');
        });
}

