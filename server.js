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

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Node app is running on port', app.get('port'));
})



