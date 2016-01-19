var express = require ('express');
var app = express();

app.use(express.static('dist'));

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Node app is running on port', server.address().port);
  console.log('serving files from ' +  __dirname + '/dist/');
})



