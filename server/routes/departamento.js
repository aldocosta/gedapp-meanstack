const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt-nodejs');
const Depto = require('../models/departamento');

Depto.methods(['get','put','post','delete']);

Depto.register(router,'/depto')

module.exports = router;