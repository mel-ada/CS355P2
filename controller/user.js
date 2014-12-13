var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all users in a <table> */
router.get('/all', function (req, res) {
    db.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayUserTable.ejs', {rs: result});
        }
    );
});


// Create Sign Up Form
router.get('/create', function(req, res){
    res.render('simpleform.ejs', {action: '/user/create'});
});

// Save Employee to the Database
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
                var placeHolderValues = {
                    recNumber: req.body.recNumber,
                    FN: req.body.FN,
                    LN: req.body.LN,
                    level: req.body.level,
                    department: req.body.department,
                    password: req.body.password,
		            username: req.body.username
                };
                res.render('displayUserInfo.ejs', placeHolderValues);
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});



/* View all users in a <table> */
router.get('/dropdown', function (req, res) {
    db.GetAllView(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('displayUserDropDown.ejs', {rs: result});
        }
    );
});


// Save User to the Database
router.post('/view', function (req, res) {
    db.GetByID( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            else if(typeof result[0].AccountID === 'undefined'){
                res.send('No user exists for that UserID.');
            }
            else {
                var placeHolderValues = {
                    email: result[0].Email,
                    password: result[0].Password,

                };
                res.render('displayUserInfo.ejs', placeHolderValues);
            }
        }
    );
});


// Save User to the Database
router.post('/posts', function (req, res) {
    db.GetPost( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            else if(typeof result[0].Post === 'undefined'){
                console.log(result);
                res.send('No user exists for that UserID.');
            }
            else {
                //var placeHolderValues = {
                  //  email: result[0].Email,
                   // password: result[0].Password,

                //};
                res.render('displayUserPosts.ejs', {rs: result});
            }
        }
    );
});


// View Schedule
router.post('/viewSchedule', function (req, res) {
    db.Schedule( req.body, function (err, result) {
            if (err) {
                throw err;
            }
                res.render('employeeSchedule.ejs', {rs: result});
            }
    );
});


router.post('/subCorner', function (req, res) {
    db.GetSub( req.body, function (err, result) {
            if (err) {
                throw err;
            }
                res.render('viewSubShifts.ejs', {rs: result});
            }
    );
});


router.get('/level', function (req, res) {
    db.DisplayLevel(function (err, result) {
            if (err) {
                throw err;
            }
                res.render('DisplayLevel.ejs', {rs: result});
            }
    );
});



router.get('/editDept', function (req, res) {
    db.selectDept(function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
                var placeHolderValues = {
                    rID: req.body.rID,
                };
                res.render('displayDeptDropDown.ejs', {rs: result, placeholders: placeHolderValues});
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});




router.post('/editDept', function (req, res) {
    db.selectDept(function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
                var placeHolderValues = {
                    rID: req.body.rID,
                };
                res.render('displayDeptDropDown.ejs', {rs: result, placeholders: placeHolderValues});
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});

router.get('/postDept', function (req, res) {
    db.postDept(req.body, function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
                var placeHolderValues = {
                    newdepartment: req.body.newdepartment,
                };
                res.render('departmentEditSuccessful.ejs', {rs: result, placeholders: placeHolderValues});
            } 
            else {
                res.send('User was not inserted.');
            }
        }
    );
});



router.post('/postDept', function (req, res) {
    db.postDept(req.body, function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
               var placeHolderValues = {
                    newdepartment: req.body.newdepartment,
                  
                };
                res.render('departmentEditSuccessful.ejs', {rs: result, placeholders: placeHolderValues});
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});

module.exports = router;

