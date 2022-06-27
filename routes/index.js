var express = require('express');
var conn = require('../lib/db');
var router = express.Router();

//Home Page and Program Cards   ---------------------------------------------
router.get('/', (req, res, next) => {
   conn.query('SELECT * FROM programs', (err, rows) => {
    if(err){
        res.render('index', { title: 'Dolphin Cove - Home', programs: ''});
    }else{
        res.render('index', { title: 'Dolphin Cove - Home', programs: rows });
    }
   });
});

//Reservation Form POST ---------------------------------------------
router.post('/addres', (req, res, next) => {
    let varSQL = "INSERT INTO reservations (hotel_name, comp_name, frst_nm, last_nm, guests_numb, program_name, method_name) VALUES('"
        + req.body.hotel_name +
        "' , '" + req.body.comp_name +
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
            res.redirect('/')
        }
    });
});



module.exports = router;