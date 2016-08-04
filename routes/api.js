var express = require('express');
var app = express();

var chat = require('../api/routes/chat');
var message = require('../api/routes/message');
var user = require('../api/routes/user');

app.use('/', chat );
app.use('/', message);
app.use('/', user);

module.exports = app;