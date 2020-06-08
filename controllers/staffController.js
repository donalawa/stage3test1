const Staff = require('../models/Staffs')
const hashMethod = require('../utils/hash');


exports.getStaffById = (req,res,next) => {
    const staffId = req.params.staffId;
    Staff.findById(staffId,staffs => {
        res.json(staffs)
    })
}

exports.getAllStafs = (req,res,next) => {
    Staff.getAllStafs(staffs => {
        res.json(staffs)
    })
}

exports.postAddStaff = (req,res,next) => {
        const hashPassword = hashMethod(req.body.password)
        const staffs = new Staff(req.body.id,req.body.staffName,req.body.email,req.body.staffpost,req.body.age,req.body.gender,hashPassword);
        console.log(req.body)
        staffs.saveStudent();
        res.json('Staff Added Successfully')
       
}

exports.putUpdateStaff = (req,res,next) => {
    const staffId = req.body.staffId;
    const updatedName = req.body.staffName;
    const staffPost = req.body.department;
    const updatedEmail = req.body.email;
    const updatedAge = req.body.age;
    const updatedGender = req.body.gender;
    const updatedhashedPassword = hashMethod(req.body.password)
    const updatedStaff = new Staff(staffId,updatedName,updatedEmail,staffPost,updatedAge,updatedGender,updatedhashedPassword);
    updatedStaff.updateStaff();
    res.json('Staff Updated Successfully')
}


exports.delDeleteStaff = (req,res,next) => {
    const staffId = req.params.staffId;
    Staff.deleteStaff(staffId)
    res.json('Staff has been deleted')
}



