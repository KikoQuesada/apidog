const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');
const petController = require('../controller/pets.controller');

router.get('/shelters', userController.listShelters);
router.post('/shelters', userController.create);
router.get('/shelters/:id', userController.detail);
router.put('/shelters/:id', userController.update);
router.delete('/shelters/:id', userController.delete);

router.get('/adopters', userController.listAdopters)
router.post('/adopters', userController.create);
router.get('/adopters/:id', userController.detail);
router.put('/adopters/:id', userController.update);
router.delete('/adopters/:id',userController.delete);

router.get('/pets', petController.list);
router.post('/pets', petController.create);
router.get('/pets/:id', petController.detail);
router.put('/pets/:id', petController.update);
router.delete('/pets/:id', petController.delete);


module.exports = router;