const express = require('express');
const router = express.Router();
const cors = require('cors');
const Depto = require('../models/departamento');

var User = require('../models/user');
var Token = require('../models/token');

const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

router.use(cors(corsOptions));

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

router.get('/depto_owners',
    passport.authenticate('bearer', { session: false }),
    (req,res,next)=>{
        Depto.aggregate([{
            $lookup:{
                    from:"users",
                    localField:"owner",
                    foreignField:"_id",
                    as :"owner"
                }
        }
        ,{
            $project:
                {
                    name:1,descricao:1,criacao:1,result:1,"owner":{name:1,email:1}
                }
            }
        ])//.cursor({ batchSize: 2500, async: true })
        .then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.json(err);
        });
});

router.post('/depto',
    passport.authenticate('bearer', { session: false }),
    function(req,res,next){
        let mongoose = require('mongoose');
        var d = new Depto();
        d.name = req.body.name;
        d.criacao = req.body.criacao,
        d.owner = mongoose.Types.ObjectId(req.body.owner),
        d.descricao = req.body.descricao

        d.save().then(function(_d){
            res.json(_d);        
        }).catch((err)=>{
            res.json(err);        
        });
});

Depto.methods(['get','put','delete']);

Depto.register(router,'/depto')

module.exports = router;