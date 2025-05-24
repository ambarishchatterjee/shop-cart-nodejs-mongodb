const User = require('../models/user')

exports.getAddUser = (req, res, next)=>{
    res.render('admin/create-user',{
        pageTitle: 'Create user',
        path: '/admin/create-user'
    })
}

exports.postAddUser = (req, res, next)=>{
    const username = req.body.username
    const email = req.body.email
    const user = new User(username, email)
    user.save().then(result=>{
        console.log(result);
        res.redirect('/create-user')
        
    }).catch(err=>{
        console.log(err);
        
    })
    
}