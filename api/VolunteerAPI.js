const VolunteerRepository = require('../repository/mysql12/VolunteerRepository');

exports.getVolunteers = (req, res, next) => {
    VolunteerRepository.getVolunteers()
        .then(volunteers => {
            res.status(200).json(volunteers);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getVolunteerByID = (req, res, next) => {
    const volunteerId = req.params.volId;
    VolunteerRepository.getVolunteerByID(volunteerId)
        .then(volunteer => {
            if (!volunteer) {
                res.status(404).json({
                    message: 'Volunteer with id: ' + volunteerId + ' not found'
                })
            } else {
                res.status(200).json(volunteer);
            }
        });
};

exports.createVolunteer = (req, res, next) => {
    VolunteerRepository.createVolunteer(req.body)
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

exports.updateVolunteer = (req, res, next) => {
    const volunteerId = req.params.volId;
    VolunteerRepository.updateVolunteer(volunteerId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Volunteer updated!', volunteer: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteVolunteer = (req, res, next) => {
    const volunteerId = req.params.volId;
    VolunteerRepository.deleteVolunteer(volunteerId)
        .then(result => {
            res.status(200).json({ message: 'Removed Volunteer', volunteer: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};