const express = require('express');
const router = express.Router()
const { createBan, getBanAll, getBanById, updateBanById, deleteBanById } = require('../controller/banController');





router.post('/new', createBan)
router.get('/', getBanAll)
router.get('/:id', getBanById)
router.put('/:id', updateBanById)
router.delete('/:id', deleteBanById)





module.exports = router