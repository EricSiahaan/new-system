const express = require('express');
const router = express.Router()

const { createSolar, getAllSolar, getSolarById, updateSolarById, deleteSolarById } = require('../controller/solarController');


// router.get('/driver', allDriver)
// router.get('/driver/:id', findDriver)
router.post('/new', createSolar)
router.get('/', getAllSolar)
router.get('/:id', getSolarById)
router.put('/update/:id', updateSolarById)
router.delete('/:id', deleteSolarById)
router.get('/get-by-date', getSolarByDate)





module.exports = router