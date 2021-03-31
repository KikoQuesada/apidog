const User = require('../models/user.model');
const createError = require('http-errors')

module.exports.create = (req, res, next) => {

    const { city } = req.body;
    req.body.city = {
        type: 'Point',
        coordinates: city
    }

    User.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(error => {
            if (error.errors && error.errors['city.coordinates']) {
                error.errors.city = error.errors['city.coordinates'];
                delete error.errors['city.coordinates']
            }
            next(error);
        })
}

module.exports.listShelters = (req, res, next) => {
    User.find({ rol: 'shelter' })
        .then(shelters => res.status(200).json(shelters))
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if(user) res.status(204).json({})
            else next(createError(404, 'User not found'))
        })
        .catch(error => next(error))
}