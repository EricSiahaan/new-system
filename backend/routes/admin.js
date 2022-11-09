const express = require('express');
const router = express.Router()
const { createAdmin, getAllAdmin, getAdminById, updateAdminById, deleteAdminById, login } = require('../controller/adminController');



router.post('/new', createAdmin)
router.get('/', getAllAdmin)
router.get('/:id', getAdminById)
router.put('/:id', updateAdminById)
router.delete('/:id', deleteAdminById)
router.post('/login', login)





module.exports = router