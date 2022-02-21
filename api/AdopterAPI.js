const AdopterRepository = require('../repository/mysql12/AdopterRepository');

exports.getAdopters = (req, res, next) => {
    AdopterRepository.getAdopters()
        .then(adopters => {
            res.status(200).json(adopters);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAdopterByID = (req, res, next) => {
    const adoptId = req.params.adoptId;
    AdopterRepository.getAdopterByID(adoptId)
        .then(adopter => {
            if (!adopter) {
                res.status(404).json({
                    message: 'Adopter with id: ' + adoptId + ' not found'
                })
            } else {
                res.status(200).json(adopter);
            }
        });
};

exports.createAdopter = (req, res, next) => {
    AdopterRepository.createAdopter(req.body)
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

exports.updateAdopter = (req, res, next) => {
    const adoptId = req.params.adoptId;
    AdopterRepository.updateAdopter(adoptId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Adopter updated!', adopter: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteAdopter = (req, res, next) => {
    const adoptId = req.params.adoptId;
    AdopterRepository.deleteAdopter(adoptId)
        .then(result => {
            res.status(200).json({ message: 'Removed Adopter', adopter: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};