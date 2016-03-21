var express = require('express');
var router = express.Router();
var users = require('../controllers/users');

// This will handle the url calls for /users/:user_id
router.route('/:userName')
    .get(function (req, res, next) {
        // Return user
        return users.getUser(req, res);
    })
    .put(function (req, res, next) {
        // Update users
    })
    .patch(function (req, res, next) {
        // Patch
    })
    .delete(function (req, res, next) {
        // Delete record
    });

router.route('/')
    .get(function (req, res, next) {

        return users.getUsers(req, res);

        //res.json({message:'Wow! I am using users api!'});
    }).post(function (req, res, next) {
    console.log('test post');
    //Create new users
});

module.exports = router;
