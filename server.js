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


app.get('/ajax/wtp-petition', function(req, res){
  var apiKey = process.env.WTP_ORG_KEY || 'not in config vars or ENV';
  var petition_id = process.env.PETITION_ID || 'not in config vars or ENV'
  console.log('received this query');
  req.query.petition_id = petition_id;
	res.send({
    key: apiKey,
		response: req.query,
	});
});
