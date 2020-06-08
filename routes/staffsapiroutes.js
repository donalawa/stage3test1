const express = require('express');
const router = express.Router();

const staffsController = require('../controllers/staffController')

// middleware for this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', staffsController.getAllStafs);

router.get('/staff/:id',staffsController.getStaffById);

router.post('/add',staffsController.postAddStaff);

 router.put('/staff/:id', staffsController.putUpdateStaff);

 router.delete('/staff/:id',staffsController.delDeleteStaff)
 
module.exports = router;