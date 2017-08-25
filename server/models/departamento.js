var restful = require('node-restful');

var mongoose = restful.mongoose;

var deptoSchema = new mongoose.Schema({
    name:String,
    criacao:Date    
});
//
module.exports = restful.model('Departamentos',deptoSchema);