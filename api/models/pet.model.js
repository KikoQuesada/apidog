const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user.model.js');

const petSchema = new Schema({
    name: {
        type: String,  
        required: 'A pet name is required',
        minLength: [3, 'Name needs at least 3 chars'],
        maxLength: [50, 'Name needs at most 50 chars']
    },
    image: {
        type: String,
        required: true,
        default: '../public/images/default avatar.png',
        validate: {
            validator: function (value) {
              try {
                const url = new URL(value);
                return url.protocol === 'http:' || url.protocol === 'https:'
              } catch(error) {
                return false;
              }
            },
            message: props => `Invalid image URL`
          }
    },
    specie: {
        type: String, 
        enum: ['dog', 'cat'],
        required: 'The pet specie is required'
    },
    race: {
        type: String, 
        required: 'The pet race is required',
        minLength: [3, 'Name needs at least 3 chars'],
        maxLength: [50, 'Name needs at most 50 chars']
    },
    age: {
        type: Number, 
        required: 'Pet age is required',
        min: [1, 'Age must be greater than 1'],
    },
    gender: {
        type: String, 
        enum: ['male', 'female'],
        required: 'Pet gender is required'
    },
    personality: {
        type: String, 
        required: 'Pet personality is required',
        minLength: [20, 'Name needs at least 20 chars'],
        maxLength: [300, 'Name needs at most 300 chars']
    },
    shelter: {
        ref: User.modelName,
        type: mongoose.Types.ObjectId,
        required: 'A shelter owner is required'
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            ret.id = doc.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;