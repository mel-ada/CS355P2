var mysql   = require('mysql');


/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host: 'cwolf.cs.sonoma.edu',
    user: 'mmorel',
    password: '003611223'
    //user: 'your_username',
    //password: 'your_password'
});

var dbToUse = 'mmorel';

//use the database for any queries run
var useDatabaseQry = 'USE ' + dbToUse;


connection.query(useDatabaseQry, function (err) {
  
});


connection.query(useDatabaseQry, function (err) {

});



//Add new employee to database
exports.Insert = function(userInfo, callback) {
    console.log(userInfo);
    var query = 'INSERT INTO P2Employee(e_SSN, e_FN, e_LN, e_level, e_dName) VALUES (\''+ userInfo.recNumber+ '\', \'' + userInfo.FN + '\', \'' + userInfo.LN + '\', \'' + userInfo.level + '\', \'' + userInfo.department + '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}


//Select schedule for specific employee
exports.Schedule = function(userInfo, callback) {
    var query = 'SELECT sh_Day, sh_startTime, sh_endTime, sh_stnName from P2Shift JOIN P2EmployeeShift ON P2Shift.sh_idShift = P2EmployeeShift.es_idShift JOIN P2Employee ON P2EmployeeShift.es_SSN = P2Employee.e_SSN WHERE P2Employee.e_SSN =' + userInfo.recNumber + ';';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//Select the name of an employee based on their SSN (to make sure no ID's are visible to the user)
exports.EmployeeSSN = function(callback) {
    var query = 'SELECT e_SSN, e_FN, e_LN from P2Employee;';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

//Select all positions for the drop down menu
exports.GetPosition = function(callback) {
    var query = 'SELECT l_Desc, l_level from P2Level;';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//Select all shifts that are not taken for a specific employee level
exports.GetSub = function(userInfo, callback) {
    var query = 'SELECT sh_Day, sh_startTime, sh_endTime, sh_stnName from P2Shift WHERE sh_taken = 0 AND sh_level =' +userInfo.level + ';';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//Select employee levels for drop down menu
exports.DisplayLevel = function(callback) {
    var query = 'SELECT l_Desc, l_level from P2Level;';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//Select departments for drop down menu
exports.selectDept = function(callback) {
    var query = 'SELECT d_name FROM P2Department;';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//Post new department after edit
exports.postDept = function(userInfo, callback) {
    var query = 'UPDATE P2Employee Set e_dName = \''+ userInfo.newdepartment +'\' WHERE e_SSN ='+ userInfo.recNumber +';';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


