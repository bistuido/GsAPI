var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    gs_id: String,
    email: String,
    password: String,
    backup_password: String,
    firstname: String,
    lastname: String,
    job: String,
    company: String,
    location: Object,
    detail: String,
    role: String,
    last_update: Number,
    last_login: Number
});
module.exports = mongoose.model('User', UserSchema);