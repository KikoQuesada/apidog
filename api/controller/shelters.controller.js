const Shelter = require('../models/shelter.model');

module.exports.create = (req, res, next) => {
    Shelter.create(req.body)
        .then(shelter => res.status(201).json(shelter))
        .catch(error => next(error))
}