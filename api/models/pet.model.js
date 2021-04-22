const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const petSchema = new Schema({
    nickName: {
        type: String,  
        required: 'A pet nickName is required',
        minLength: [3, 'nickName needs at least 3 chars'],
        maxLength: [50, 'nickName needs at most 50 chars']
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/getapet/image/upload/v1618949993/web%20sources/pet_zr6far.png',
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
    gallery: {
        type: [String],
    },
    specie: {
        type: String, 
        enum: ['dog', 'cat'],
        required: 'The pet specie is required'
    },
    race: {
        type: String, 
        required: 'The pet race is required',
        minLength: [3, 'Race needs at least 3 chars'],
        maxLength: [50, 'Race needs at most 50 chars']
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
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: 'A shelter owner is required'
    },
    status: {
        type: String,
        enum: ['Adopted', "Looking for home"],
        required: 'Need to say if the pet is available',
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