const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
const PHONE_PATTERN = /^[679]{1}[0-9]{8}$/;
const CIF_PATTERN = /^([a-z]|[A-Z]|[0-9])[0-9]{7}([a-z]|[A-Z]|[0-9])$/;
const Pet = require('../models/pet.model');


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
        minLength: [3, 'Name needs at least 3 chars'],
        maxLength: [50, 'Name needs at most 50 chars'],
        required: function() {
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
                validator: function([lng, lat]) {
                    return isFinite(lng) && isFinite(lat) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
                },
                message: props => `Invalid location`
            }
        }
    },
    avatar: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/getapet/image/upload/v1617970328/default_avatar_xnnmwl.png',
    },
    image: {
        type: [String]
    },
    password: {
        type: String,
        required: 'A valid password is required',
        match: [PASSWORD_PATTERN, 'The password is invalid']
    },
    contact: {
        type: String,
        required: function() {
            if (this.rol === 'shelter') {
                return true;
            } else {
                return false;
            }
        }
    },
    phone: {
        type: String,
        required: function() {
            if (this.rol === 'shelter') {
                return true;
            } else {
                return false;
            }
        },
        validate: {
            validator: function validate(value){
                const str = value.toString().replace(/\s/g, '');
                return str.length === 9 && PHONE_PATTERN.test(str);
            }
        }

    },
    cif: {
        type: String,
        required: function() {
            if (this.rol === 'shelter') {
                return true;
            } else {
                return false;
            }
        },
        match: [CIF_PATTERN, 'A valid CIF/NIF/NIE is required']
    },
    description: {
        type: String,
        minLength: [100, 'Name needs at least 100 chars'],
        maxLength: [300, 'Name needs at most 300 chars'],
        required: function() {
            if (this.rol === 'shelter') {
                return true;
            } else {
                return false;
            }
        }
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;

            ret.id = ret._id;
            delete ret._id;

            ret.city = ret.city.coordinates;
            return ret;
        }
    }
});


userSchema.virtual('pets', {
    ref: Pet.modelName,
    localField: '_id',
    foreignField: 'User'
});


const User = mongoose.model('User', userSchema);
module.exports = User;