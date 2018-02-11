var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    userID:{type:String, required: true},
    username:{type: String, required: true}
});

module.exports = mongoose.model('userData', userSchema);