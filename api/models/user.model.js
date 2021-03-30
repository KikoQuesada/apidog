const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new Schema({

    rol: {
        type: String,
        enum: ['adopter', 'shelter'],
        required: true
    },
    name: {
        type: String,
        required: 'A name is required',
        minLength: [3, 'Name needs at least 3 chars'],
        maxLength: [50, 'Name needs at most 50 chars']
    },
    lastName: {
        type: String,
        required: function () {
            if (this.rol === 'adopter') {
                return true;
            } else {
                return false;
            }
        }
    },
    email: {
        unique: true,
        type: String, 
        required: 'A valid email is required',
        match: [EMAIL_PATTERN, 'The email is invalid']
    },
    city: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            validate: {
                validator: function ([lng, lat]) {
                    return isFinite(lng) && isFinite(lat) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
                },
                message: props => `Invalid location`
            }
        }
    },
    avatar: {
        type: String,
        required: true,
        default: '../public/images/default avatar.png'
    },
    password: {
        type: String,
        required: 'A valid password is required',
        match: [PASSWORD_PATTERN, 'The password is invalid']
    },
    contact: {
        type: String,
        required: function () {
            if (this.rol === 'shelter') {
                return true;
            } else {
                return false;
            }
        }
    },
    phone: {
        type: String,
        required: function () {
            if (this.rol === 'shelter') {
                return true;
            } else {
                return false;
            }
        }

    }
});

const User = mongoose.model('Shelter', userSchema);
module.exports = User;