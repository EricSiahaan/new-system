const express = require('express');
const router = express.Router()
const { createPer, getAllPer, getPerById, updatePerById, deletePerById } = require('../controller/perController');





// router.get('/driver', allDriver)
// router.get('/driver/:id', findDriver)
router.post('/new', createPer)
router.get('/', getAllPer)
router.get('/:id', getPerById)
router.put('/:id', updatePerById)
router.delete('/:id', deletePerById)





module.exports = router