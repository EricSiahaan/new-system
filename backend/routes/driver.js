const express = require('express');
const router = express.Router()

const { createDriver, getAllDriver, getDriverById, updateDriverById, deleteDriverById } = require('../controller/driverController');


// router.get('/driver', allDriver)
// router.get('/driver/:id', findDriver)
router.post('/new', createDriver)
router.get('/', getAllDriver)
router.get('/:id', getDriverById)
router.put('/update/:id', updateDriverById)
router.delete('/:id', deleteDriverById)





module.exports = router