const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const Depto = require('../models/departamento');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


Depto.methods(['get','put','post','delete']);

Depto.register(router,'/depto')

module.exports = router;