var express = require('express'),
  routes = require('./routes.js'),
  app = express(),
  port=4000;

app.use(express.bodyParser());

routes(app);

app.listen(port);
console.log("Listening on port "+port);
