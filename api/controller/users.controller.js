const User = require('../models/user.model');

module.exports.create = (req, res, next) => {

    const { city } = req.body;
    req.body.city = {
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