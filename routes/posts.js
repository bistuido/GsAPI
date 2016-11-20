var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/post');
var randomID = require("random-id");


// GET /posts listing.
router.get('/', function(req, res, next) {
    Post.find(function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

// GET /posts/:post_id
router.get('/:post_id', function(req, res, next) {
    Post.findOne({
        post_id: req.params.post_id
    }, function(error, post){
        if(error) return next(err);
        if(!post){
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
                data: post
            });
        }
    });
});

// POST /posts
router.post('/', function(req, res, next) {
    if(!req.body.title || req.body.title.length == 0){
        return res.json({
            success: false,
            gs_code: 406,
            message: 'Not acceptable'
        });
    }
    Post.findOne({
      title: req.body.title
    }, function(error, post){
    if(error) return next(err);
    if(!post){
        Post.create({
            post_id: randomID(15, "0"),
            title: req.body.title,
            cat_id: req.body.cat_id,
            lg_img: req.body.lg_img,
            md_img: req.body.md_img,
            sm_img: req.body.sm_img,
            contents: req.body.contents,
            last_update: new Date().getTime(),
            poster_gs_id: req.body.poster_gs_id,
            acceptor_gs_id: req.body.acceptor_gs_id,
        }, function(err, post) {
            if (err) return next(err);
            res.json({
                success: true,
                gs_code: 200,
                message: 'Created',
                data: post
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

// PUT /posts/:post_id
router.put('/:post_id', function(req, res, next) {
    if(!req.body.title || req.body.title.length == 0){
        return res.json({
            success: false,
            gs_code: 404,
            message: 'Not acceptable'
        })
    }
    Post.update({ "post_id": req.params.post_id },
    {
        $set:
        {
            "title": req.body.title,
            "cat_id": req.body.cat_id,
            "lg_img": req.body.lg_img,
            "md_img": req.body.md_img,
            "sm_img": req.body.sm_img,
            "contents": req.body.contents,
            "last_update": new Date().getTime(),
            "poster_gs_id": req.body.poster_gs_id
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
            Post.findOne({"post_id": req.params.post_id},
                function(err, post){
                    res.json({
                        success: true,
                        gs_code: 200,
                        message: 'Updated',
                        data: post
                    });
                });
        }
    });
});

/* DELETE /posts/:post_id */
router.delete('/:post_id', function(req, res, next) {
    Post.findOne({
        post_id: req.params.post_id
    }, function(error, post){
        if(error) return next(err);
        if(!post){
            res.json({
                success: false,
                gs_code: 404,
                message: 'Not found'
            });
        }
        else {
            Post.remove({
                post_id: post.post_id
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