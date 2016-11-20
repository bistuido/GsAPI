var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    post_id: String,
    title: String,
    cat_id: String,
    lg_img: String,
    md_img: String,
    sm_img: String,
    contents: Array,
    last_update: Number,
    poster_gs_id: String,
    acceptor_gs_id: String,
});
module.exports = mongoose.model('Post', PostSchema);