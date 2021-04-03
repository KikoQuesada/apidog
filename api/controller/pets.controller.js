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

module.exports.list = (req, res, next) => {
    Pet.find()
        .then(pets => res.status(200).json(pets))
        .catch(next)
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;

    Pet.findByIdAndUpdate(id, req.body, { new: true})
        .then(pet => res.status(202).json(pet))
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    Pet.findById(req.params.id)
        .then(pet => res.status(200).json(pet))
        .catch(next)
}