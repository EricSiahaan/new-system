const express = require('express');
const router = express.Router()
const { createAdmin, getAllAdmin, getAdminById, updateAdminById, deleteAdminById, login, updatePassword } = require('../controller/adminController');



router.post('/register', createAdmin)
router.get('/', getAllAdmin)
router.get('/:id', getAdminById)
router.put('/:id', updateAdminById)
router.delete('/:id', deleteAdminById)
router.post('/login', login)
router.put('/update-password/:id', updatePassword)






module.exports = router