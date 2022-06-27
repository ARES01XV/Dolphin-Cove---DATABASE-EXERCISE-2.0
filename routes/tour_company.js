var express = require('express');
var conn = require('../lib/db');
var router = express.Router();

// / **************** Tour Company ******************************
//Tour Company Page--------------------------------------
router.get('/', (req, res) => {

    if(req.session.loggedIn === true){
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
    } else {
        res.redirect('/company_login')
    }
});

// //CREATE Reservation Form----------------------------------
router.get('/create-reservation', (req, res, next) => {
    if(req.session.loggedIn === true) {
        conn.query('SELECT * FROM reservations, hotels, programs, payment_methods, tour_comps WHERE reservations.hotel_id = hotels.hotel_id AND reservations.program_id = programs.program_id AND reservations.method_id = payment_methods.method_id AND reservations.comp_id = tour_comps.comp_id', (err, rows) => {
            if (err) {
                res.render('/tour_company/reservations-add', {
                    title: 'Create Reservation',
                    res_info: ''
                })
            } else {
                res.render('tour_company/reservations-add', {
                    title: 'Create Reservation',
                    res_info: rows
                });
            }
        })
    } else{
        res.redirect('/company_login')
    }
});

// ADD Reservation POST-------------------------------------
router.post('/addres_tc', (req, res) => {
    let varSQL = "INSERT INTO reservations (hotel_name, frst_nm, last_nm, guests_numb, program_name, method_name) VALUES('"
        + req.body.hotel_name +
        "' , '" + req.body.frst_nm +
        "' , '" + req.body.last_nm +
        "' , '" + req.body.guests_numb +
        "' , '" + req.body.program_name +
        "' , '" + req.body.method_name +
        "' )";


    conn.query(varSQL, (err, rows) => {
        if(err){
            //
        } else {
            res.redirect('/tour_company/index')
        }
    });
});

//EDIT Reservation-------------------------------------
router.get('/edit/:reservation_id', (req, res, next) => {
    let varSQL = 'SELECT * FROM reservations WHERE reservation_id=' + req.params.reservation_id;

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




// **************** LOG OUT **************************************
router.get('/tp_logout', (req, res) => {
    req.session.destroy();
    res.redirect('/company_login')
});
module.exports = router;