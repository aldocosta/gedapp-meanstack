var restful = require('node-restful');

var mongoose = restful.mongoose;

var deptoSchema = new mongoose.Schema({
    name:String,
    descricao:String,
    criacao: { type: Date, default: Date.now },
    owner:{ type: Object, ref: 'Users' }    
});

module.exports = restful.model('Departamentos',deptoSchema);