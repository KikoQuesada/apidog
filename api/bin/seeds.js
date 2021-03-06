const mongoose = require('mongoose');
const User = require('../models/user.model');
const Pet = require('../models/pet.model');
const sheltersData = require('../data/shelters.json');
const adoptersData = require('../data/adopters.json');
const petsData = require('../data/pet.json');

require('dotenv').config();
require('../config/db.config');




mongoose.connection.once('open', () => {
    console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);
    mongoose.connection.db.dropDatabase()
        .then(() => console.log('- Database dropped'))
        .then(() => User.create(sheltersData))
        .then(shelters => {
            console.info(`- Added ${shelters.length} Shelters`)
            const sheltersWithOwnerId = petsData.map(pet => {
                pet.shelter = shelters.find(shelter => shelter.email === pet.shelter).id;
                return pet
            })
            return Pet.create(sheltersWithOwnerId)
        })
        .then(pets => console.info(`- Added ${pets.length} Pets`))
        .then(() => User.create(adoptersData))
        .then(adopters => console.info(`- Added ${adopters.length} Adopters`))
        .then(() => console.info(`- All data created!`))
        .catch(error => console.error(error))
        .then(() => process.exit(0))
})