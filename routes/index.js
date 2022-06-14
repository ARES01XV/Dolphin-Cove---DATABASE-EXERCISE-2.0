var express = require('express');
var conn = require('../lib/db');
var router = express.Router();

//Home Page and Program Cards
router.get('/', (req, res, next) => {
   conn.query('SELECT *FROM programs', (err, rows) => {
    if(err){
        res.render('index', { title: 'Dolphin Cove - Home', programs: ''});
    }else{
        res.render('index', { title: 'Dolphin Cove - Home', programs: rows });
    }
   });
});

module.exports = router;