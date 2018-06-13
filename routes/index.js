var express = require('express');
var router = express.Router();
var path = require('path')
var PythonShell = require('python-shell');
var pyshell = new PythonShell('/public/pyscripts/process_vid.py', {
  args: ['hello', 'world']
});
let pyOutput;

pyshell.on('message', function (message) {
  pyOutput = JSON.parse(message)
});

pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  let vid_name = pyOutput["name"];
  let vid_source = pyOutput["source"];
  let vid_timein = pyOutput["timein"];
  res.render('index', { title: 'Express', media_title: vid_name, source: vid_source, timein:vid_timein });
});

module.exports = router;