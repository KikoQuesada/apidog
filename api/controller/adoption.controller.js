const createError = require('http-errors');
const Adoption = require('../models/Adoption.model');

module.exports.create = (req, res, next) => {

    req.body.owner = req.user.id

    Adoption.create(req.body)
        .then(adoption => res.status(201).json(adoption))
        .catch(next);
};

module.exports.detail = (req, res, next) => {
    Adoption.findById(req.params.id)
        .populate('user')
        .then(adoption => {
            if(!adoption) {
                next(createError(404, 'Adoption form not found'))
            } else {
                res.json(adoption)
            }
        })
        .catch(next);
}