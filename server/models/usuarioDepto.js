var restful = require('node-restful');

var mongoose = restful.mongoose;

var usuarioDeptoSchema = new mongoose.Schema({    
    criacao: { type: Date, default: Date.now },
    criador:{ type: Object, ref: 'Users' },
    user:{ type: Object, ref: 'Users' },
    depto:{ type: Object, ref: 'Departamento' }
});

module.exports = restful.model('usuarioDepartamento',usuarioDeptoSchema);