const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');
const petController = require('../controller/pets.controller');
const adoptionController = require('../controller/adoption.controller');
const uploadShelters = require('./multer.config');
const secure = require('../middlewares/secure.middleware');


// -- SHELTERS ROUTES --
router.get('/shelters', secure.isAuthenticated, userController.listShelters);
router.post('/shelters', uploadShelters.single('avatar'), userController.create);
router.get('/shelters/:id', secure.isAuthenticated, userController.detail);
router.put('/shelters/:id', uploadShelters.single('avatar'), userController.update);
router.delete('/shelters/:id', userController.delete);


// -- USERS ROUTES --
router.get('/adopters', userController.listAdopters)
router.post('/adopters', uploadShelters.single('avatar'), userController.create);
router.get('/adopters/:id', userController.detail);
router.put('/adopters/:id', userController.update);
router.delete('/adopters/:id',userController.delete);


// PETS ROUTES --
router.get('/pets', petController.list);
router.post('/pets', petController.create);
router.get('/pets/:id', secure.isAuthenticated, petController.detail);
router.put('/pets/:id', petController.update);
router.delete('/pets/:id', petController.delete);

// ADOPTIONS ROUTES --
router.post('/adoptions', adoptionController.create);
router.get('/adoptions/:id', adoptionController.detail);

router.post('/login', userController.login);
router.post('/logout', userController.logout);


module.exports = router;