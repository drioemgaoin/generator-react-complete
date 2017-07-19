const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;
const host = '127.0.0.1';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('index.html');
});

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500);
  res.render('error', { error: err });
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
});