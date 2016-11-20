var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var randomID = require("random-id");


// GET /users listing.
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

// GET /users/gs_id
router.get('/:gs_id', function(req, res, next) {
    User.findOne({
        gs_id: req.params.gs_id
    }, function(error, user){
        if(error) return next(err);
        if(!user){
            res.json({
                success: false,
                gs_code: 404,
                message: 'Not found'
            });
        }else{
            res.json({
                success: true,
                gs_code: 200,
                message: 'Found',
                data:{
                    gs_id: user.gs_id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    location: user.location
                }
            });
        }
    });
});

router.post('/is_email_existed', function(req, res, next){
    User.findOne({
        email: req.body.email
    }, function(error, user){
        if(error) return next(err);
        if(!user){
            res.json({
                success: true,
                gs_code: 200,
                message: 'Available'
            });
        }else{
            res.json({
                success: false,
                gs_code: 409,
                message: 'Not available'
            });
        }
    });
});

// POST /users
router.post('/', function(req, res, next) {
  User.findOne({
    email: req.body.email
  }, function(error, user){
    if(error) return next(err);
    if(!user){
      if(!req.body.password){
        res.json({
          success: false,
          gs_code: 406,
          message: 'No password'
        });
      }else{
        User.create({
            gs_id: randomID(10, "0"),
            email: req.body.email,
            password: req.body.password,
            backup_password: req.body.password,
            role: 'user'
        }, function(err, user) {
          if (err) return next(err);
          res.json({
            success: true,
            gs_code: 200,
            message: 'Created',
            data:{
                gs_id: user.gs_id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                location: user.location
            }
          });
        });
      }
    }else{
      res.json({
        success: false,
        gs_code: 409,
        message: 'Not available'
      });
    };
  });
});

// PUT /users/:gs_id
router.put('/:gs_id', function(req, res, next) {
    User.update({ "gs_id": req.params.gs_id },
    {
        $set:
        {
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "location": req.body.location
        }
    }, function(err, user){
        if(err) return next(err);
        if(!user){
            res.json({
                success: false,
                gs_code: 404,
                message: 'Not found'
            })
        }else{
            User.findOne({ "gs_id": req.params.gs_id }, function (err, user) {
                if (err) return next(err);
                res.json({
                    success: true,
                    gs_code: 200,
                    message: 'Updated',
                    data: {
                        "gs_id": user.gs_id,
                        "email": user.email,
                        "firstname": user.firstname,
                        "lastname": user.lastname,
                        "location": user.location
                    }
                });
            });
        }
    });
});

/* DELETE /users/:gs_id */
router.delete('/:gs_id', function(req, res, next) {
    console.log(req.params.gs_id);
    User.findOne({
        gs_id: req.params.gs_id
    }, function(error, user){
        if(error) return next(err);
        if(!user){
            res.json({
                success: false,
                gs_code: 404,
                message: 'Not found'
            });
        }
        else {
            User.remove({
                gs_id: user.gs_id
            }, function(error, user){
                if(error) return next(err);
                if(!user){
                    res.json({
                        success: false,
                        gs_code: 404,
                        message: 'Not found'
                    });
                }else {
                    res.json({
                        success: true,
                        gs_code: 200,
                        message: 'Deleted'
                    });
                }
            });
        }
    });
});

module.exports = router;