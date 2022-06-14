const { request } = require('express');
var express = require('express');
const { redirect } = require('express/lib/response');
var conn = require('../lib/db');
var router = express.Router();

//Admin Home--------------------------------------
router.get('/', (req, res, next) => {
    // if (req.session.loggedIn === true){
        // if(err){
        //     //
        // } else {
            res.render('admin/index',
            {title: 'Dolphin Cove - Admin'});
        // }
    // } else {
    //     res.redirect('/admin_login')
    // }
});

// **************** RESERVATIONS **********************************
//Reservations Page--------------------------------------
router.get('/reservations', (req, res) => {

    // if(req.session.loggedIn === true){
        conn.query(
            'SELECT * FROM reservations, hotels, guests, programs, payment_methods, tour_comps WHERE reservations.hotel_id = hotels.hotel_id AND reservations.guest_id = guests.guest_id AND reservations.program_id = programs.program_id AND reservations.method_id = payment_methods.method_id AND reservations.comp_id = tour_comps.comp_id', (err, rows) => {
            if(err){
                res.render('admin/reservations', {
                    title: 'Reservations',
                    reservations: ''
                })
            } else {
                res.render('admin/reservations', {
                    title: 'Reservations',
                    reservations: rows
                })
            }
        })
    // } else {
    //     res.redirect('/admin_login')
    // }
});

//CREATE Reservation----------------------------------
router.get('/create-reservation', (req, res, next) => {
    res.render('admin/reservations-add', {
        title: 'Create Reservation'
    });
});

// conn.query('SELECT * FROM tour_comps', (err, rows) => {
//     res.render('admin/reservations-add', {
//         tour_companies: rows
//     })
// });

// ADD Reservation-------------------------------------
router.post('/add-tour_comp', (req, res) => {
    let varSQL = "INSERT INTO tour_comps (comp_pic, comp_name, description, email, password) VALUES('"
              + req.body.comp_pic + "' , '"
                req.body.comp_name + "' , '"
                req.body.description + "' , '"
                req.body.email + "' , '"
                req.body.password +
                "' )";
    conn.query(varSQL, (err, rows) => {
        if(err){
            //
        } else {
            res.redirect('/admin/tour_companies')
        }
    });
});

//EDIT Reservations-------------------------------------
router.get('/reservations/edit/:reservation_id', (req, res, next) => {
    let varSQL = 'SELECT * FROM reservations WHERE reservation_id=' +
        req.params.reservation_id;

    conn.query(varSQL, (err, rows) => {
        if (err) {
            //
        } else {
            res.render('admin/reservations-edit', {
                title: 'Reservations Edit',
                reservations: rows
            });
        }
    });
});



// **************** TOUR COMPANIES ********************************
//Tour Companies Page--------------------------------------
router.get('/tour_companies', (req, res) => {
    // if(req.session.loggedIn === true){
        conn.query('SELECT * FROM tour_comps', (err, rows) => {
            if(err){
                res.render('admin/tour_companies', {
                    title: 'Tour Companies',
                    tour_companies: ''
                })
            } else {
                res.render('admin/tour_companies', {
                    title: 'Tour Companies',
                    tour_companies: rows
                })
            }
        })
    // } else {
    //     res.redirect('/admin_login')
    // }
});

//CREATE Tour Comp.----------------------------------
router.get('/create-tour_comp', (req, res, next) => {
    res.render('admin/tour_companies-add', {
        title: 'Create Tour Comp.'
    });
});


//ADD Tour Comp.-------------------------------------
router.post('/add', (req, res, next) => {
    let varSQL = "INSERT INTO tour_comps (comp_pic, comp_name, description, email, password) VALUES('"
        + req.body.CompPic + "' , '"
                  req.body.comp_name + "' , '"
                  req.body.description + "' , '"
                  req.body.email + "' , '"
                  req.body.password +
                  "' )";

    conn.query(varSQL, (err, rows) => {
        if(err){
            //
        } else {
            res.redirect('/admin/tour_companies')
        }
    });
});

//EDIT Tour Comp.-------------------------------------
router.get('/tour_companies/edit/:comp_id', (req, res, next) => {
    let varSQL = 'SELECT * FROM tour_comps WHERE comp_id=' + 
    req.params.comp_id; 

    conn.query(varSQL, (err, rows) => {
        if(err){
            //
        } else {
            res.render('admin/tour_companies-edit', {
                title: 'Tour Comp. Edit',
                tour_companies: rows
            });
        }
    });
});

//UPDATE Tour Comp.-------------------------------------
// router.post('/update-tour_comp', (req, res, next) => {
//     let varSQL = "UPDATE tour_comps SET comp_name = '" + 
//                 req.body.comp_name + 
//                 "', description = '" + req.body.description +
//                 "' WHERE comp_id = " + req.body.comp_id; 

//     conn.query(varSQL, (err, rows) => {
//         if(err){
//             //
//         } else {
//             res.redirect('/admin/tour_companies'); //redirect after update
//         }
//     });
// });

//DELETE Tour Comp.-------------------------------------
router.get('/delete/:comp_id', (req, res, next) => {
    let varSQL = "DELETE FROM tour_comps WHERE comp_id = " +
    req.params.comp_id; 

    conn.query(varSQL, (err, rows) => {
        if(err){
            //
        } else {
            res.redirect('/admin/tour_companies'); //redirect after deleting
        }
    });
});


// **************** PROGRAMS **************************************
//Programs Page--------------------------------------
router.get('/programs', (req, res) => {
    // if(req.session.loggedIn === true){
        conn.query('SELECT * FROM programs', (err, rows) => {
            if(err){
                res.render('admin/programs', {
                    title: 'Programs',
                    programs: ''
                })
            } else {
                res.render('admin/programs', {
                    title: 'Programs',
                    programs: rows
                })
            }
        })
    // } else {
    //     res.redirect('/admin_login')
    // }
});

//CREATE Program----------------------------------
router.get('/create-program', (req, res, next) => {
    res.render('admin/programs-add', {
        title: 'Create Program'
    });
});

//ADD Program-------------------------------------
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

//EDIT Program-------------------------------------
router.get('/programs/edit/:program_id', (req, res, next) => {
    let varSQL = 'SELECT * FROM programs WHERE program_id=' +
        req.params.program_id;

    conn.query(varSQL, (err, rows) => {
        if (err) {
            //
        } else {
            res.render('admin/programs-edit', {
                title: 'Programs Edit',
                programs: rows
            });
        }
    });
});


module.exports = router;