const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');


const adoptionSchema = new Schema({
    homeInfo: {
        type: String,
        maxLength: [1000, 'home information needs at most 1000 chars']
    },
    familyInfo: {
        type: String,
        maxLength: [1000, 'home information needs at most 1000 chars']
    },
    workInfo: {
        type: String,
        maxLength: [1000, 'home information needs at most 1000 chars'] 
    },
    petNecessities: {
        type: String,
        maxLength: [1000, 'home information needs at most 1000 chars']
    },
    petCosts: {
        type: String,
        maxLength: [1000, 'home information needs at most 1000 chars']
    },
    whyAdoption: {
        type: String,
        maxLength: [1000, 'home information needs at most 1000 chars']
    },
    perfectPet: {
        type: String,
        maxLength: [1000, 'home information needs at most 1000 chars']
    },
    shelterPolicy: {
        type: String,
        maxLength: [1000, 'home information needs at most 1000 chars']
    },
    badBehaviour: {
        type: String,
        maxLength: [1000, 'home information needs at most 1000 chars']
    },
    behaviourSolution: {
        type: String,
        maxLength: [1000, 'home information needs at most 1000 chars']
    },
    owner: {
        ref: 'User',
        type: mongoose.Types.ObjectId,
        require: 'Owner is required'
      }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret._id;
            delete ret.__v;
            ret.id = doc.id;
            return ret;
        }
    }
});



const Adoption = mongoose.model('Adoption', adoptionSchema);
module.exports = Adoption;