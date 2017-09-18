const express = require('express');
const router = express.Router();
const cors = require('cors');
const Depto = require('../models/departamento');


router.use(cors());

router.get('/depto_owners',(req,res,next)=>{
    Depto.aggregate([{
        $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as :"theOwner"
            }
    }
    ,{
        $project:
            {
                name:1,descricao:1,criacao:1,result:1,"theOwner":{name:1,email:1}
            }
        }
    ]).then((data)=>{
        res.json(data);
    });
});

router.post('/depto',function(req,res,next){
    var d = new Depto();
    d.name = req.body.name;
    d.criacao = req.body.criacao,
    d.owner = req.body.ownerId,
    d.descricao = req.body.descricao

    d.save().then(function(_d){
        rconsole.log(_d);
    });

});

Depto.methods(['get','put','delete']);

Depto.register(router,'/depto')

module.exports = router;