const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

var User = require('../models/user');
var Token = require('../models/token');

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  preflightContinue: false,
  allowedHeaders:['Content-Type', 'Authorization']
}

router.use(cors());
//router.options('/user/', cors());
// router.get('/user/',cors(),function(req,res,next){	
// 	next();
// });
 
/*estrategia*/
passport.use(new Strategy(
  function(token, cb) {	
	Token.findOne({'token':token},function(err,user){
		if (err) { return cb(err); }
		if (!user) { return cb(null, false); }
		if(user.expira <= Date.now()) {
			return cb(null,false);
		}
		return cb(null, user);    
	});	
}));


// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");  
//   res.header("Access-Control-Allow-Headers", "*, X-Requested-With, Content-Type, Accept, Authorization, Bearer");  
//   next();
// });

router.use('/user',
	passport.authenticate('bearer', { session: false }),
	(req,res,next)=>{	
	if(req.body.name){		
		/*
			password default 123456
		*/
		let encryptpass = bcrypt.hashSync('123456',bcrypt.genSaltSync(5),null);
		req.body.password = encryptpass;		
	}		
	next();
});

router.post('/logar',function(req,res,next){
	var body = {
		name:  req.body.name,
		password:  req.body.password,
		email: req.body.email
	}

	var retorno ={
		falha:undefined
	};

	 User.findOne({'email':body.email},function(err,user){
        if(err) 
    	{
    		retorno.falha = err;
    	}

        if(!user) {
        	retorno.falha = 'No user found';        	
        	return res.json(retorno);
        }
        if(!user.validPassword(body.password)){
			retorno.falha ='Usuario ou senha invalidos';           
			return res.json(retorno);
        }
        else{
			/*
				Limpa os tokens do usuario
			*/
			Token.remove({userId:user.id},function(err){
				if(err){console.log(err);}
			});

			/*
				Toke expira depois de 10 minutos
			*/
			let dnow = Date.now() +((60*1000)*10);        	
			
			let _roles = '';
			user.roles.forEach(function(v){
				_roles+='_'+bcrypt.hashSync(v,bcrypt.genSaltSync(5),null);				
			});
			
        	let utoken = new Token({
        		token: user.password+'__'+user.id+'_',
        		userId: user.id,
        		expira: dnow
        	}); 

        	utoken.save().then(function(d){
	        	console.log('Token salvo: ');
	        });

	        var token ={
        		token: utoken.token
        	} 
        }              
        
        return res.json(token);        
    });	
});

/*restful na rota /user*/
User.methods(['get','put','post','delete']);

User.register(router,'/user')

module.exports = router;