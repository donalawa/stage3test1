const Student = require('../models/Students')
const hashMethod = require('../utils/hash');

exports.getStudentById = (req,res,next) => {
    const studId = req.params.studentId;
    Student.findById(studId,student => {
        res.json(student)
    })
}

exports.getAllStudents = (req,res,next) => {
    Student.getAllStudents(students => {
        res.json(students)
    })
}

exports.postAddStudent = (req,res,next) => {
        const hashPassword = hashMethod(req.body.password)
        const student = new Student(req.body.id,req.body.studentName,req.body.email,req.body.department,req.body.age,req.body.gender,hashPassword);
        console.log(req.body)
        student.saveStudent();
        res.json('Student Added Successfully')
       
}

exports.putUpdateStudent = (req,res,next) => {
    const studId = req.body.studentId;
    const updatedName = req.body.studentName;
    const updatedDepartment = req.body.department;
    const updatedEmail = req.body.email;
    const updatedAge = req.body.age;
    const updatedGender = req.body.gender;
    const updatedStudent = new Student(studId,updatedName,updatedEmail,updatedDepartment,updatedAge,updatedGender);
    updatedStudent.updateStudent();
    res.json('Student Updated Successfully')
}


exports.delDeleteStudent = (req,res,next) => {
    const studId = req.params.studId;
    Student.deleteStudent(studId)
    res.json('Student has been deleted')
}



