require('dotenv').config();

const mongoose = require('mongoose');
const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');

require('./config/db.config');


const app = express();

app.use(express.json());
app.use(logger('dev'));

/* Configure routes */
const router = require('./config/routes.config');
app.use('/api/v1', router);

/* Configure errors */
app.use((req, res, next) => {
    next(createError(404, 'Route not found!'))
});


app.use((error, req, res, next) => {
    if (error instanceof Mongoose.error.ValidationError) {
        error = createError(400, error)
    }
    console.error(error);


    const data = {}
    data.message = error.message; 

    res.status(error.status || 500).json(data)
});


const port = Number(process.env.PORT || 3001);
app.listen (port, () => {
    console.log(`Ready listen on port ${port}!`);
})