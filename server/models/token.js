var restful = require('node-restful');


var mongoose = restful.mongoose;

var tokenSchema = new mongoose.Schema({
    token:String,
    userId:String,
    expira:Number,
    user:{}    
});
//
module.exports = restful.model('Token',tokenSchema);