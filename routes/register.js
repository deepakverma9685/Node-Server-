var express = require('express');
var router = express.Router();
var dbcon = require('../database/data_config');
var bcyrpt = require('bcrypt');

router.post('/', function (req, res) {

    var today = new Date();
    var salt = bcyrpt.genSaltSync(10);
    var hash = bcyrpt.hashSync(req.body.password, salt);
    console.log(hash);

    var student = {
        "name": req.body.name,
        "school": req.body.school,
        "class": req.body.class,
        "mobile": req.body.mobile,
        "password": hash,
        "created_at": today,
        "updated_at": today
    };

    dbcon.query('INSERT INTO student SET ?', student, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                message: 'user registered sucessfully',
                id: results.insertId
            });
        }
    });


});

/*
function get_user_data(id) {
    console.log("laoding");
    conncetion.query('SELECT * FROM student WHERE id = ?',[id], function (error, results, fields){
        if (error){
            console.log(error);
            /!* res.json({
                 status:false,
                 message:'there are some error with query'
             })*!/
        }else {
            console.log(results);
            /!* res.json({
                 status:true,
                 data:results,
                 message:'user registered sucessfully'
             })*!/
        }
    });
*/

function check_name(name) {

    /* dbcon.query("SELECT id from student WHERE name = ?",[name], function (error, results, fields){
         if (error){
             console.log(error);

         }else if (results){
             console.log(results)
             if ()

         }
     });*/

}


module.exports = router;
