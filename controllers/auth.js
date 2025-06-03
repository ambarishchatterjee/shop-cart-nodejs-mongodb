const User = require('../models/user')
exports.getLogin = (req, res, next) => {
    res.render('auth/login.ejs', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    })
    //console.log(req.session.isloggedIn);

}

exports.postLogin = (req, res, next) => {
    User.findById('6821bbed881efa59c3f2a042')
        .then(user => {
            req.session.isloggedIn = true
            req.session.user = user
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}