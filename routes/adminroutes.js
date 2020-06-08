const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController')



router.post('/login',adminController.getLogin)

router.get('/logout',adminController.getLogout)

module.exports = router;