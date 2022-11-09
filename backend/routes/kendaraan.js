const express = require('express');
const router = express.Router()
const { createKendaraan, getAllKendaraan, updateKendaraanById, deleteKendaraanById, getKendaraanById } = require('../controller/kendaraanController');




// router.get('/driver', allDriver)
// router.get('/driver/:id', findDriver)
router.post('/new', createKendaraan)
router.get('/', getAllKendaraan)
router.get('/:id', getKendaraanById)
router.put('/update/:id', updateKendaraanById)
router.delete('/:id', deleteKendaraanById)





module.exports = router