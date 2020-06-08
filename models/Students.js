const path = require('path');
const fs = require('fs');
const rootDir = require('../utils/path');


const p2 = path.join(rootDir,'db','students.json');
const p3 = path.join(rootDir,'db','studentlogs.json');


const getStudentsFromFile = (cb) => {
    fs.readFile(p2,(err,fileContent) => {
        if(err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent))
    })
}



const getStudentsLogs = (cb) => {
    fs.readFile(p3,(err,fileContent) => {
        if(err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent))
    })
}


module.exports = class Student {
    constructor(id,studentName,email,department,age,gender,password){
        this.id = id;
        this.studentName = studentName;
        this.email = email,
        this.department = department;
        this.age = age;
        this.gender = gender;
        this.password = password;
    }

    saveStudent() {
            getStudentsFromFile(students => {
                    getStudentsLogs(studentslogs => {
                        let date = new Date().toISOString();
                        studentslogs.push({id: this.id, logs: ['Created on: ' + date]})
                        fs.writeFile(p3,JSON.stringify(studentslogs),(err) => {
                            console.log(err)
                        })
                    })
                    // console.log(this)
                    students.push(this);
                    
                    fs.writeFile(p2,JSON.stringify(students),(err) => {
                        console.log(err)
                    })
        })
       
    }

    updateStudent() {
        getStudentsFromFile(students => {
            const existingStudentIndex = students.findIndex(s => s.id == this.id);
            const updatededStudent = [...students];
            updatededStudent[existingStudentIndex] = this;
            fs.writeFile(p,JSON.stringify(updatededStudent),(err) => {
                console.log(err);
            })
        })
    }

    static getAllStudents(cb) {
        getStudentsFromFile(students => {
            cb(students)
        })
    }

    static getAllStudentsLogs(cb) {
        getStudentsLogs(studentLogs => {
            cb(studentLogs)
        })
    }

    static getStudentById(id,cb){
        getStudentsFromFile(studentsArr => {
            studentsArr.find((student) => {
                let studentSend = student.id == id;
                if(studentSend){
                    cb(student)
                }
            })
        })
    }

    static deleteStudent(id) {
        getStudentsFromFile(students => {
            //we filter the students and remove the one whoose id does not match
            const updatedStudents = students.filter(s => s.id !== id);
            fs.writeFile(p,JSON.stringify(updatedStudents),(err) => {
                console.log(err)
            })
        })
    }
}

