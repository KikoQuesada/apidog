const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');

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

router.get('/pets');
router.post('/pets');
router.get('/pets/:id');
router.put('/pets/:id');
router.delete('/pets/:id');








module.exports = router;