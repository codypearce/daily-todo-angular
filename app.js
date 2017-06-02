const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/daily-todo');

app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.use(methodOverride());


require('./api/routes')(app);

const port = 3000;
app.listen(port);
console.log('App is listening on port ' + port);
