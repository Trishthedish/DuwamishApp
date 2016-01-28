var express = require('express');
var app = express();
var sha256 = require('sha.js')('sha256');

/*-- Static file server --*/
app.use(express.static('dist'));

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Node app is running on port', server.address().port);
  console.log('serving files from ' +  __dirname + '/dist/');
})

/*-- AJAX end points --*/

app.get('/ajax/change-petition', function(req, res){
  var secretKey = process.env.CHANGE_ORG_KEY || '';
  console.log(secretKey);
  var stringObj = JSON.stringify(req.query).replace('{', '').replace('}', '') + secretKey;
  var hashing = sha256.update(stringObj, 'utf8');
  console.log('received this query Here');
  req.query.rsig = hashing.digest('hex');
	res.send({
		response: req.query,
	});
});
