const Joi = require('joi');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isAdmin: Boolean
})

userSchema.methods.generatedToken = function(){
  const token = jwt.sign({_id: this._id},'jwtPrivateKey')
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required().email(),
      password: Joi.string().min(5).max(50).required()
    };
  
    return Joi.validate(user, schema);
  }

  exports.User = User;
  exports.validate = validateUser;