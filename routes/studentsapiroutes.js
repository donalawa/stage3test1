const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController')

// middleware for this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', studentController.getAllStudents);

router.get('/student/:id',studentController.getStudentById);

router.post('/add',studentController.postAddStudent);

 router.put('/student/:id', studentController.putUpdateStudent);

 router.delete('/student/:id',studentController.delDeleteStudent)
 
module.exports = router;