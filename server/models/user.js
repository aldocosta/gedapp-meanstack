var restful = require('node-restful');
const bcrypt = require('bcrypt-nodejs');
var mongoose = restful.mongoose;

var userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    token:String,
    tokenDate:Date,
    roles:[]
});

userSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.password);
}


module.exports = restful.model('Users',userSchema);