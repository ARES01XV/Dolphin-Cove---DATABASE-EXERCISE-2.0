const { request } = require('express');
var express = require('express');
const { redirect } = require('express/lib/response');
var conn = require('../lib/db');
var router = express.Router();

//Admin Home--------------------------------------
router.get('/', (req, res, next) => {
    if (req.session.loggedIn === true){
        conn.query(
            'SELECT * FROM admins', (err, rows) => { //to display admin name and picture
                if(err){
                    res.render('admin/index', {
                        title: 'Dolphin Cove - Admin',
                        admins: ''
                    })
                } else {
                res.render('admin/index', { 
                    title: 'Dolphin Cove - Admin',
                    admins: rows
                });
        }
            })
        
    } else {
        res.redirect('/admin_login')
    }
});

// **************** RESERVATIONS **********************************
//Reservations Page--------------------------------------
router.get('/reservations', (req, res) => {

    if(req.session.loggedIn === true){
        conn.query(
            'SELECT * FROM reservations, hotels, guests, programs, payment_methods, tour_comps, admins WHERE reservations.hotel_id = hotels.hotel_id AND reservations.guest_id = guests.guest_id AND reservations.program_id = programs.program_id AND reservations.method_id = payment_methods.method_id AND reservations.comp_id = tour_comps.comp_id AND reservations.admin_id = admins.admin_id', (err, rows) => {
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
    } else {
        res.redirect('/admin_login')  
    }
});

//CREATE Reservation----------------------------------
router.get('/create-reservation', (req, res, next) => {
    if(req.session.loggedIn === true){
        conn.query('SELECT * FROM reservations, hotels, programs, payment_methods, tour_comps WHERE reservations.hotel_id = hotels.hotel_id AND reservations.program_id = programs.program_id AND reservations.method_id = payment_methods.method_id AND reservations.comp_id = tour_comps.comp_id', (err, rows) => {
            if(err){
                res.render('/admin/reservations-add', {
                    title: 'Create Reservation',
                    create_reservation: ''
                })
            } else {
                res.render('admin/reservations-add', {
                    title: 'Create Reservation',
                    create_reservation: rows
                });
            }
        })
    } else {
        res.redirect('/admin_login')
    }
});




// ADD Reservation POST-------------------------------------
router.post('/addres', (req, res) => {
    let varSQL = "INSERT INTO reservations (hotel_name, frst_nm, last_nm, guests_numb, program_name, method_name, comp_name) VALUES('"
            + req.body.hotel_name + 
            "' , '" + req.body.frst_nm + 
            "' , '" + req.body.last_nm + 
            "' , '" + req.body.guests_numb +
            "' , '" + req.body.program_name +
            "' , '" + req.body.method_name +
            "' , '" + req.body.comp_name +
            "' )";

    conn.query(varSQL, (err, rows) => {
        if(err){
            //
        } else {
            res.redirect('/admin/reservations')
        }
    });
});

//EDIT Reservations-------------------------------------
router.get('/reservations/edit/:reservation_id', (req, res, next) => { 
    let varSQL = 'SELECT * FROM reservations WHERE reservation_id=' + req.params.reservation_id;

    conn.query(varSQL, (err, rows) => {
        if (err) {
            //
        } else {
            res.render('admin/reservations-edit', {
                title: 'Reservations Edit',
                reservations: rows[0]
            });
        }
    });
});



// **************** TOUR COMPANIES ********************************
//Tour Companies Page--------------------------------------
router.get('/tour_companies', (req, res) => {
    if(req.session.loggedIn === true){
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
    } else {
        res.redirect('/admin_login')
    }
});

//CREATE Tour Comp.----------------------------------
router.get('/create-tour_comp', (req, res, next) => {
    if (req.session.loggedIn === true) {
        res.render('admin/tour_companies-add', {
            title: 'Create Tour Comp.'
        });
    } else {
        res.redirect('/admin_login')
    }
});


//ADD Tour Comp. POST-------------------------------------
router.post('/add_tc', (req, res, next) => {
    let varSQL = "INSERT INTO tour_comps (comp_pic, comp_name, description, email, password) VALUES('"
                 + req.body.comp_pic +  
                 "' , '" + req.body.comp_name + 
                 "' , '" + req.body.description + 
                 "' , '" + req.body.email + 
                 "' , '" + req.body.password +
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
                tour_comps: rows[0]
            });
        }
    });
});

//UPDATE Tour Comp. POST-------------------------------------
router.post('/update', (req, res, next) => {
    let varSQL = "UPDATE tour_comps SET comp_name = '" + req.body.comp_name + "', description = '" + req.body.description + "' WHERE comp_id = " + req.body.comp_id; 

    conn.query(varSQL, (err, rows) => {
        if(err){
            //
        } else {
            res.redirect('/admin/tour_companies'); //redirect after update
        }
    });
});

//DELETE Tour Comp.-------------------------------------
router.get('/tour_companies/delete/:comp_id', (req, res, next) => {
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
    if(req.session.loggedIn === true){
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
    } else {
        res.redirect('/admin_login')
    }
});

//CREATE Program----------------------------------
router.get('/create-program', (req, res, next) => {
    if (req.session.loggedIn === true){
        res.render('admin/programs-add', {
            title: 'Create Program'
        });
    } else {
        res.redirect('/admin_login')
    }
});


//ADD Program POST-------------------------------------
router.post('/add_program', (req, res, next) => {
    let varSQL = "INSERT INTO programs (program_pic, program_name, description, price_per_person) VALUES('"
                + req.body.program_pic + 
                "' , '" + req.body.program_name + 
                "' , '" + req.body.description + 
                "' , '" + req.body.price_per_person +
                "' )";

    conn.query(varSQL, (err, rows) => {
        if(err){
            //
        } else {
            res.redirect('/admin/programs')
        }
    });
});

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
                programs: rows[0]
            });
        }
    });
});

//UPDATE Program POST-------------------------------------
router.post('/updatepro', (req, res, next) => {
    let varSQL = "UPDATE programs SET program_pic = '" + req. body.
        program_pic + "', program_name = '" + req.body.program_name + "', description = '" + req.body.
        description + "', price_per_person'" + req.body.price_per_person + "' WHERE program_id = " + req.body.program_id;

        conn.query(varSQL, (err, rows) => {
            if(err){
                //
            } else {
                res.redirect('/admin/programs')
            }
        });
});


//DELETE Program-------------------------------------
router.get('/programs/delete/:program_id', (req, res, next) => {
    let varSQL = "DELETE FROM programs WHERE program_id = " +
    req.params.program_id;

    conn.query(varSQL, (err, rows) => {
        if(err){
            //
        } else {
            res.redirect('/admin/programs')
        }
    })
});


// **************** LOG OUT **************************************
router.get('/admin_logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin_login')
});


module.exports = router;