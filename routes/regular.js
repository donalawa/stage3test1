const express = require('express');
const regularController = require('../controllers/regular');


const router = express.Router();


router.get('/',regularController.getHome)


module.exports = router;