require('dotenv').config();

const createError = require('http-error');
const logger = require('morgan');
const express = require('express');

const app = express();

app.use(express.json());
app.use(logger('dev'));


const router = require('./config/routes.config');
app.use('/api/v1', router);


app.use((req, res, next) => {
    next(createError(404, 'Route not found!'))
});


app.use((error, req, res, next) => {

    console.error(error);


    const data = {}
    data.message = error.message; 

    res.status(error.status || 500).json({})
});


const port = Number(process.env.PORT || 3001);
app.listen (port, () => {
    console.log(`Ready listen on port ${port}!`);
})