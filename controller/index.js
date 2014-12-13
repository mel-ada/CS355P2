var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

/*About Page*/
router.get('/about', function(req, res){
    res.render('about.ejs');
});

/*View Schedule*/
router.get('/viewSchedule', function(req, res){
        db.EmployeeSSN(function (err, result) {
            if (err) throw err;
        res.render('viewSchedule.ejs', {rs: result});
    }
    );

});

/*Sub Corner*/
router.get('/subCorner', function(req, res){
   db.GetPosition(function (err, result){
        if (err) throw err;
          res.render('subCorner.ejs', {rs: result});
      
   })
});



/* index file that links to various requirements */
router.get('/', function(req, res){

    res.render('index');
});

router.get('/simpleForm', function(req, res){
    res.render('simpleform.ejs', {action: '/displayFormData'});
});


router.post('/displayFormData', function(req, res) {
    console.log(req.body);
    res.render('displayFormData.ejs', req.body );
});

module.exports = router;