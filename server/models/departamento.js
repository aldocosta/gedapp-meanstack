var restful = require('node-restful');

var mongoose = restful.mongoose;

var deptoSchema = new mongoose.Schema({
    name:String,
    descricao:String,
    criacao:Date,
    pai:{ type: Object, ref: 'Departamentos ' },
    owner:{ type: Object, ref: 'Users' }    
});

module.exports = restful.model('Departamentos',deptoSchema);