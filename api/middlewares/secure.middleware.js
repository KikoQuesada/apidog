const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(createError(401, 'User is not authenticated'))
    }
};

module.exports.checkRol = (rol) => {
    return (req, res, next) => {
        if (req.user.rol === role) {
            next();
        } else {
            next(createError(403, 'You must not be here'))
        }
    }
}