const mongoose = require('mongoose');

module.exports = function(){
    console.log('aqui estoy')
    mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
}