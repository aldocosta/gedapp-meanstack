const express = require('express');
const router = express.Router();
const cors = require('cors');
const Depto = require('../models/departamento');


router.use(cors());

Depto.methods(['get','put','post','delete']);

Depto.register(router,'/depto')

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

module.exports = router;