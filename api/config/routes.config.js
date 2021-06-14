const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');
const petController = require('../controller/pets.controller');
const adoptionController = require('../controller/adoption.controller');
const upload = require('./storageUsers.config');
const secure = require('../middlewares/secure.middleware');


// -- SHELTERS ROUTES --
router.get('/shelters', secure.isAuthenticated, userController.listShelters);
router.post('/shelters', upload.single('avatar'), userController.create);
router.get('/shelters/:id', secure.isAuthenticated, userController.detail);
router.put('/shelters/:id', upload.single('avatar'), userController.update);
router.delete('/shelters/:id', userController.delete);


// -- USERS ROUTES --
router.get('/adopters', userController.listAdopters)
router.post('/adopters', upload.single('avatar'), userController.create);
router.get('/adopters/:id', userController.detail);
router.patch('/adopters/:id', userController.update);
router.delete('/adopters/:id',userController.delete);


// PETS ROUTES --
router.get('/pets', petController.list);
router.post('/pets', upload.single('image'), petController.create);
router.get('/pets/:id', secure.isAuthenticated, petController.detail);
router.put('/pets/:id', petController.update);
router.delete('/pets/:id', petController.delete);

// ADOPTIONS ROUTES --
router.patch('/adoptions/:id', adoptionController.update);
router.post('/adoptions', adoptionController.create);
router.get('/adoptions/:id', adoptionController.detail);

router.post('/login', userController.login);
router.post('/logout', userController.logout);


module.exports = router;