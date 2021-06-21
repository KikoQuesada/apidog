require('dotenv').config();

const mongoose = require('mongoose');
const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const passport = require('passport');


require('./config/passport.config')
require('./config/db.config');
const cors = require('./config/cors.config');
const session = require('./config/session.config');


const app = express();

app.use(express.static(`${__dirname}/react-app`))

app.use(express.json());
app.use(logger('dev'));
app.use(session);
app.use(cors);
app.use(passport.initialize());
app.use(passport.session());

/* Configure routes */
const router = require('./config/routes.config');
app.use('/api/v1', router);

/* Configure errors */
app.use((req, res, next) => {
    next(createError(404, 'Route not found!'))
});



app.use((error, req, res, next) => {
    if (error instanceof mongoose.Error.ValidationError) {
        error = createError(400, error)
    } else if (error instanceof mongoose.Error.CastError) {
        error = createError(404, 'Resource not found');
    }

    console.error(error);


    const data = {}
    data.message = error.message;
    if (error.errors) {
        data.errors = Object.keys(error.errors)
            .reduce((errors, key) => {
                errors[key] = error.errors[key].message;
                return errors;
            } , {})
    }

    res.status(error.status || 500).json(data)
});


const port = Number(process.env.PORT || 3001);
app.listen (port, () => {
    console.log(`Ready listen on port ${port}!`);
})