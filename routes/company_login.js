var express = require('express');
var conn = require('../lib/db');
var router = express.Router();

//Company Login Form-----------------------------------
router.get('/', (req, res) => {
    res.render('company_login', {
        tittle: 'Company Login'
    });
});

//Company Login (page tht loads after logged in)---------
// router.post('', (req, res, next) => {

//     var email = req.body.email;
//     var password = req.body.password;

//     conn.query('SELECT * FROM tour_comps WHERE email = ? AND BINARY password = ?', [email, password], (err, results, fields) => {

//         if (results.length <= 0) { //if login is incorrect
//             req.flash('error', 'Invalid credentials please try again!')
//             res.redirect('/admin_login')
//         } else { //if login is correct
//             req.session.loggedIn = true;
//             req.session.comp_id = comp_id;
//             req.session.comp_name = comp_name;
//             req.session.description = description;
//             res.redirect('/');
//         }
//     });
// });


module.exports = router;