// GLobal Defines and module Calls
const express = require('express');
const app = express();
// EJS Engine Use
app.set('view engine', 'ejs');
// GLobal Defines and module Calls

// Routes
const users = require('./routes/users');
const pages = require('./routes/pages');
// Routes


app.use('/',pages);
// index page
app.get('/', function(req, res) {
    res.render('../views/pages/index');
});


app.listen(3000)