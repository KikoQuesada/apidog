const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');

const MongoStore = connectMongo(expressSession);

const session = expressSession({
    secret: process.env.SESSION_SECRET || 'Super Secret Session String',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: process.env.SESSION_SECURE || false,
        httpOnly: true,
        maxAge: 3600000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: process.env.SESSION_MAX_AGE || 3600,
    })
});

module.exports = session;