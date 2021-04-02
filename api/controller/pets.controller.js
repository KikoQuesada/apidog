const createError = require('http-errors');
const Pet = require('../models/pet.model');

module.exports.create = (req, res, next) => {
    Pet.create(req.body)
        .then(pet => res.status(201).json(pet))
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Pet.findByIdAndDelete(req.params.id)
        .then(pet => {
            if(pet) res.status(204).json({})
            else next(createError(404, 'Pet not found!'))
        })
        .catch(next)
}