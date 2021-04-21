const passport = require('passport');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, next) => {
    next(null, user.id)
});

passport.deserializeUser((id, next) => {
    User.findById(id)
        .then(user => next(null, user))
        .catch(next);
});

passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, next) => {
    console.log('ESTOY AQUI')
    User.findOne({ email })
      .then(user => {
        console.log(`EL USUSARIO ES ${user}`)
        if (!user) {
          next(null, null, { email: 'Invalid email or password'})
        } else {
          return user.checkPassword(password)
            .then(match => {
              console.log('MATCH ES', match)
              if (match) {
                next(null, user)
              } else {
                console.log('NO MATCH')
                next(null, null, { email: 'Invalid email or password' })
              }
            })
        }
      }).catch(next)
  }));