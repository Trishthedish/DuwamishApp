var express = require ('express');
var app = express();

app.use(express.static('Public'));

app.use('/', function (req, res, next) {
  var options = {
    root: __dirname + '/Public/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
});

var server = app.listen(5000,function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server working!');
});



