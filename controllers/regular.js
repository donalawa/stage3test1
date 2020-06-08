exports.getHome = (req,res,next) => {
    res.render('home',{isLogin:false, pageTitle: 'Home',activeHome: true})
}
