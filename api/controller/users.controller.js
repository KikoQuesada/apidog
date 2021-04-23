const User = require('../models/user.model');
const createError = require('http-errors');
const passport = require('passport');

module.exports.create = (req, res, next) => {
    console.log(req.body)
    const { city } = req.body;
    req.body.city = {
        type: 'Point',
        coordinates: city
    }

    if (req.file) {
        req.body.avatar = req.file.url
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
        .populate('pets')
        .then(shelters => res.status(200).json(shelters))
        .catch(error => next(error))
}

module.exports.listAdopters = (req, res, next) => {
    User.find({ rol: 'adopter' })
        .then(adopters => res.status(200).json(adopters))
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (user) res.status(204).json({})
            else next(createError(404, 'User not found'))
        })
        .catch(error => next(error))
}

module.exports.update = (req, res, next) => {
    const { city } = req.body;
    const { id } = req.params;

    if (city) {
        req.body.city = {
            type: 'Point',
            coordinates: city
        }
    }

    if (req.file) {
        req.body.avatar = req.file.url
    }

    User.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.status(202).json(user))
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    User.findById(req.params.id)
    .populate('pets')
    .populate('Adoption')
    .then(user => {
        if (user) res.status(200).json(user)
        else next(createError(404, 'User not found'))
    })
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
        if(error) {
            next(error);
        } else if (!user) {
            next(createError(400, { errors: validations }))
        } else {
            req.login(user, error => {
                if (error) next(error)
                else res.json(user)
            })
        }
    })(req, res, next);
};

module.exports.logout = (req, res, next) => {
    req.logout();
  
    res.status(204).end()
  }