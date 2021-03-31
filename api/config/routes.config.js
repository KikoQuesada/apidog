const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');

router.get('/shelters', userController.listShelters);
router.post('/shelters', userController.create);
router.get('/shelters/:id');
router.put('/shelters/:id');
router.delete('/shelters/:id', userController.delete);


router.post('/users', userController.create);
router.get('/users/:id');
router.put('/users/:id');
router.delete('/users/:id',userController.delete);

router.get('/pets');
router.post('/pets');
router.get('/pets/:id');
router.put('/pets/:id');
router.delete('/pets/:id');








module.exports = router;