const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shelterSchema = new Schema({
    name: {
        type: String,
        required: 'A name is required',
        minLength: [3, 'Name needs at least 3 chars'],
        maxLength: [50, 'Name needs at most 50 chars']
    },
    contact: {
        type: String,
        required: 'A contact person is required',
    },
    phone: {
        type: String,
        required: 'A phone number is required',

    }
});

const Shelter = mongoose.model('Shelter', shelterSchema);
module.exports = Shelter;