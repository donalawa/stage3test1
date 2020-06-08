const Students = require('../models/Students')

const admins = [{email: 'awadonalcien12@gmail.com',password: 'test'}]

exports.getLogin = (req, res) => {
    const { email, password } = req.body;
    // const hashedPassword = hashMethod(password);
    admins.forEach(admin => {
        if(admin.password == password){
            res.render('student-details',{isLogin: true})
        }
    })

}

exports.getLogout = (req,res,next) => {
    res.render('home', {
        isLogin: false,
        message: 'Logout Complete',
        messageClass: 'alert-success'
    });
}