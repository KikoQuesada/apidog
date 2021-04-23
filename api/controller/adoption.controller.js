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

module.exports.update = (req, res, next) => {
    delete req.body.owner;
    delete req.body.id;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    Adoption.findById(req.params.id)
        .then(adoption => {
            if (!adoption) {
                next(createError(404, 'Adoption form not found'))
            } else if (adoption.owner != req.user.id) {
                next(createError(403, 'Only the owner can perform this action!'))
            } else {
                Object.assign(adoption, req.body)
                return adoption.save()
                    .then(adoption => res.json(adoption))
            }
        }).catch(next)
}