const express = require('express');
const router = express.Router();

router.get('/shelters');
router.post('/shelters');
router.get('/shelters/:id');
router.put('/shelters/:id');
router.delete('/shelters/:id');

router.get('/pets');
router.post('/pets');
router.get('/pets/:id');
router.put('/pets/:id');
router.delete('/pets/:id');








module.exports = router;