const config = require("config");
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const {User} = require('../models/user')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    if(!(req.body.password == user.password)) return res.status(400).send('Invalid email or password');
    
    const token = user.generatedToken();
    res.send(token).header('x-auth-token', token);
});

function validate(user) {
    const schema = {
      email: Joi.string().min(5).max(50).required().email(),
      password: Joi.string().min(5).max(50).required()
    };
  
    return Joi.validate(user, schema);
  }

module.exports = router;