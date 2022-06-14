var express = require('express');
var conn = require('../lib/db');
var router = express.Router();

//Admin Login Form-----------------------------------
router.get('/', (req, res) => {
    res.render('admin_login', {
        tittle: 'Admin Login'
    });
});

// //Admin Login POST Info---------
router.post('/login', (req, res, next) => {

    var email = req.body.email;
    var password = req.body.password;

    conn.query('SELECT * FROM admins WHERE email = ? AND BINARY password = ?', [email, password], (err, results, fields) => {
        
        if(results.length <= 0){ //if login is incorrect
            req.flash('error', 'Invalid credentials please try again!')
            res.redirect('/admin_login')
        } else { //if login is correct
            req.session.loggedIn = true;
            req.session.admin_id = admin_id;
            req.session.fname = fname;
            req.session.lname = lname;
            res.redirect('/admin');
        }
    });
});


module.exports = router;