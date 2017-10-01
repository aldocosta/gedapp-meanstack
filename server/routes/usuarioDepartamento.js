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
			                    name:1,descricao:1,criacao:1,result:1,"depto":{name:1},"user":{name:1}
			                }
			            }
			]).then((data)=>{
            res.json(data);
        });
});


DeptoUsers.methods(['put','delete', 'post', 'patch']);

DeptoUsers.register(router,'/depto_users')

module.exports = router;