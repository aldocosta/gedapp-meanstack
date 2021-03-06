const express = require('express');
const router = express.Router();
const cors = require('cors');

const User = require('../models/user');
const Token = require('../models/token');
const DeptoUsers = require('../models/usuarioDepto');

const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

router.use(cors(corsOptions));


router.get('/depto_users',
    //passport.authenticate('bearer', { session: false }),
    (req,res,next)=>{
        DeptoUsers.aggregate(
			[{
			            $lookup:{
			                    from:"departamentos",
			                    localField:"depto",
			                    foreignField:"_id",
			                    as :"depto"
			                }
			        },
			        {
			            $lookup:{
			                    from:"users",
			                    localField:"user",
			                    foreignField:"_id",
			                    as :"user"
			                }
			        }
			        ,{
			            $project:
			                {
								name:1,descricao:1,criacao:1,result:1
								,"depto":{name:1,_id:1}
								,"user":{name:1}
			                }
			            }
			]).then((data)=>{
            res.json(data);
        });
});

router.get('/depto_users_find',(req,res,next)=>{
	let mongoose = require('mongoose');
	var d = new DeptoUsers();
	let ret = DeptoUsers.find({user: mongoose.Types.ObjectId("5a2d657ebbab1825f6015e54")});
	ret.then((data)=>{
		data.forEach((v,i)=>{
			console.log(v.depto);
		});
		res.json(data);
	});
	
});

router.post('/depto_users',
    //passport.authenticate('bearer', { session: false }),
    function(req,res,next){
        let mongoose = require('mongoose');
		var d = new DeptoUsers();
        d.user = mongoose.Types.ObjectId(req.body.userList);
		d.depto = mongoose.Types.ObjectId(req.body.depto);
		
		let deptos = [];

		let ret = DeptoUsers.find({
			user: mongoose.Types.ObjectId(d.user),
			depto:mongoose.Types.ObjectId(d.depto)});

		ret.then((data)=>{
			data.forEach((v,i)=>{
				deptos.push(v.depto);
			});					
		}).then(function(){	
			if(deptos.length==0){
				d.save().then(function(_d){
					res.json(_d);        
				}).catch((err)=>{
					res.json(err);        
				});
			}
			else{
				res.json("");
			}
		});

});


router.post('/depto_users_list',function(req,res,next){
	let mongoose = require('mongoose');
	let obj = req.body.userList;

	obj.userIds.forEach((id)=>{
		var d = new DeptoUsers();
        d.user = mongoose.Types.ObjectId(id);
        d.depto = mongoose.Types.ObjectId(obj.deptoId);
        d.save().then((retorno)=>{
        	console.log(retorno);
        });
	});

	res.json('Finalizado');
});

DeptoUsers.methods(['put','delete', 'post', 'patch']);

DeptoUsers.register(router,'/depto_users')

module.exports = router;