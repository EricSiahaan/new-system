const express = require('express');
const router = express.Router()
const { createKinerja, getAllKinerja, updateKinerjaById, deleteKinerjaById, getKinerjaById } = require('../controller/kinerjaController');





// router.get('/driver', allDriver)
// router.get('/driver/:id', findDriver)
router.post('/new', createKinerja)
router.get('/', getAllKinerja)
router.get('/:id', getKinerjaById)
router.put('/:id', updateKinerjaById)
router.delete('/:id', deleteKinerjaById)





module.exports = router