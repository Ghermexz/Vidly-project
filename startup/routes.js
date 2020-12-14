
const express = require('express');
const genres = require('../routes/genres');
const users = require('../routes/user');
const customers = require('../routes/customers');
const auth = require('../routes/auth')
const error = require('../midleware/error');

module.exports = function (app) { 
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}