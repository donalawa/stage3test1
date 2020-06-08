const path = require('path');
const fs = require('fs');
const rootDir = require('../utils/path');


const p2 = path.join(rootDir,'db','staffs.json');
const p3 = path.join(rootDir,'db','staffslogs.json');


const getStaffsFromFile = (cb) => {
    fs.readFile(p2,(err,fileContent) => {
        if(err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent))
    })
}



const getStaffsLogs = (cb) => {
    fs.readFile(p3,(err,fileContent) => {
        if(err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent))
    })
}


module.exports = class Student {
    constructor(id,staffName,email,staffPost,age,gender,password){
        this.id = id;
        this.staffName = staffName;
        this.email = email,
        this.staffPost = staffPost;
        this.age = age;
        this.gender = gender;
        this.password = password;
    }

    saveStudent() {
            getStaffsFromFile(staffs => {
                    getStaffsLogs(staffslogs => {
                        let date = new Date().toISOString();
                        staffslogs.push({id: this.id, logs: ['Created on: ' + date]})
                        fs.writeFile(p3,JSON.stringify(staffslogs),(err) => {
                            console.log(err)
                        })
                    })
                    // console.log(this)
                    staffs.push(this);
                    
                    fs.writeFile(p2,JSON.stringify(staffs),(err) => {
                        console.log(err)
                    })
        })
       
    }

    updateStudent() {
        getStaffsFromFile(staffs => {
            const existingStaffIndex = staffs.findIndex(s => s.id == this.id);
            const updatedStaff = [...staffs];
            updatedStaff[existingStaffIndex] = this;
            fs.writeFile(p,JSON.stringify(updatedStaff),(err) => {
                console.log(err);
            })
        })
    }

    static getAllStafs(cb) {
        getStaffsFromFile(staffs => {
            cb(staffs)
        })
    }

    static getAllStaffsLogs(cb) {
        getStaffsLogs(staffslogs => {
            cb(staffslogs)
        })
    }

    static getStaffById(id,cb){
        getStaffsFromFile(studentsArr => {
            studentsArr.find((student) => {
                let studentSend = student.id == id;
                if(studentSend){
                    cb(student)
                }
            })
        })
    }

    static deleteStaff(id) {
        getStaffsFromFile(staffs => {
            //we filter the staffs and remove the one whoose id does not match
            const updattedStafs = staffs.filter(s => s.id !== id);
            fs.writeFile(p,JSON.stringify(updattedStafs),(err) => {
                console.log(err)
            })
        })
    }
}

