var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = require('../models/category');
var randomID = require("random-id");


// GET /categories listing.
router.get('/', function(req, res, next) {
  Category.find(function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});

// GET /categories/:cat_id
router.get('/:cat_id', function(req, res, next) {
    Category.findOne({
        cat_id: req.params.cat_id
    }, function(error, category){
        if(error) return next(err);
        if(!category){
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
                data: category
            });
        }
    });
});

// POST /categories
router.post('/', function(req, res, next) {
    if(!req.body.title || req.body.title.length == 0){
        return res.json({
            success: false,
            gs_code: 406,
            message: 'Not acceptable'
        });
    }
    Category.findOne({
      title: req.body.title
    }, function(error, category){
    if(error) return next(err);
    if(!category){
        Category.create({
            cat_id: randomID(3, "0"),
            title: req.body.title,
            detail: req.body.detail,
            lg_img: req.body.lg_img,
            md_img: req.body.md_img,
            sm_img: req.body.sm_img,
            catger_gs_id: req.body.catger_gs_id,
            refs: req.body.refs
        }, function(err, category) {
            if (err) return next(err);
            res.json({
                success: true,
                gs_code: 200,
                message: 'Created',
                data: category
            });
        });
    }else{
      res.json({
        success: false,
        gs_code: 409,
        message: 'Not available'
      });
    };
    });
});

// PUT /categories/:cat_id
router.put('/:cat_id', function(req, res, next) {
    if(!req.body.title || req.body.title.length == 0){
        return res.json({
            success: false,
            gs_code: 404,
            message: 'Not acceptable'
        })
    }
    Category.update({ "cat_id": req.params.cat_id },
    {
        $set:
        {
            "title": req.body.title,
            "detail": req.body.detail,
            "lg_img": req.body.lg_img,
            "md_img": req.body.md_img,
            "sm_img": req.body.sm_img,
            "catger_gs_id": req.body.catger_gs_id,
            "refs": req.body.refs
        }
    }, function(err, act){
        if(err) return next(err);
        if(!act){
            res.json({
                success: false,
                gs_code: 404,
                message: 'Not found'
            })
        }else{
            Category.findOne({"cat_id": req.params.cat_id},
                function(err, category){
                    res.json({
                        success: true,
                        gs_code: 200,
                        message: 'Updated',
                        data: category
                    });
                });
        }
    });
});

/* DELETE /categories/:cat_id */
router.delete('/:cat_id', function(req, res, next) {
    Category.findOne({
        cat_id: req.params.cat_id
    }, function(error, category){
        if(error) return next(err);
        if(!category){
            res.json({
                success: false,
                gs_code: 404,
                message: 'Not found'
            });
        }
        else {
            Category.remove({
                cat_id: category.cat_id
            }, function(error, act){
                if(error) return next(err);
                if(!act){
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