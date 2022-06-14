var express = require('express');
var conn = require('../lib/db');
var router = express.Router();

// / **************** Tour Company ******************************
//Tour Company Page--------------------------------------
router.get('/', (req, res) => {

    // if(req.session.loggedIn === true){
    conn.query('SELECT * FROM reservations, hotels, guests, programs, payment_methods, tour_comps WHERE         reservations.hotel_id = hotels.hotel_id AND reservations.guest_id = guests.guest_id AND reservations.program_id = programs.program_id AND reservations.method_id = payment_methods.method_id AND reservations.comp_id = tour_comps.comp_id' , (err, rows) => {
            if (err) {
                res.render('tour_company', {
                    title: 'Reservations',
                    reservations: ''
                })
            } else {
                res.render('tour_company', {
                    title: 'Reservations',
                    reservations: rows
                })
            }
        })
    // } else {
    //     res.redirect('/admin_login')
    // }
});

// //CREATE Reservation Form----------------------------------
router.get('/create-reservation', (req, res, next) => {
    res.render('tour_company/reservations-add', {
        title: 'Create Reservation'
    });
});

// ADD Reservation-------------------------------------
// router.post('/add-tour_comp', (req, res) => {
//     let varSQL = "INSERT INTO tour_comps (comp_pic, comp_name, description, email, password) VALUES('"
//               + req.body.comp_pic + "' , '"
//                   req.body.comp_name + "' , '"
//                   req.body.description + "' , '"
//                   req.body.email + "' , '"
//                   req.body.password +
//     "' )";
//     conn.query(varSQL, (err, rows) => {
//         if(err){
//             //
//         } else {
//             res.redirect('/admin/tour_companies')
//         }
//     });
// });

//EDIT Reservation-------------------------------------
// router.get('/edit/:reservation_id', (req, res, next) => {
//     let varSQL = 'SELECT * FROM reservations WHERE reservation_id=' + req.params.reservation_id;

//     conn.query(varSQL, (err, rows) => {
//         // if (err) {
//         //     //
//         // } else {
//             res.render('tour_company/reservations-edit', {
//                 title: 'Reservation Edit',
//                 reservations: rows
//             });
//         // }
//     });
// });

//EDIT Reservation-------------------------------------
router.get('/reservations/edit/:reservation_id', (req, res, next) => {
    let varSQL = 'SELECT * FROM reservations WHERE reservation_id=' +
        req.params.reservation_id;

    conn.query(varSQL, (err, rows) => {
        if (err) {
            //
        } else {
            res.render('tour_company/reservations-edit', {
                title: 'Reservation Edit',
                reservations: rows
            });
        }
    });
});

module.exports = router;