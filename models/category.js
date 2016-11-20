var mongoose = require('mongoose');
var CategorySchema = new mongoose.Schema({
    cat_id: String,
    title: String,
    detail: String,
    lg_img: String,
    md_img: String,
    sm_img: String,
    catger_gs_id: String,
    acceptor_gs_id: String,
    refs: Array
});
module.exports = mongoose.model('Category', CategorySchema);