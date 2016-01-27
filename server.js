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
var secretKey = process.env.CHANGE_ORG_KEY || '';
var hashing = sha256.update(secretKey, 'utf8');

app.get('/ajax/change-petition', function(req, res){
	var obj = {};
	console.log('received this query');
	console.log(req.query);
	res.send({
		query: req.query,
		hash: hashing.digest('hex')
	});
});
