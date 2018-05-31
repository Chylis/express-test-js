var express = require('express'); //web framework
var path = require('path');
var app = express();

app.use(function(req, res, next){ //simple logger
  console.log("Incoming: method: '%s'\nURL: '%s'\nbody: '%j'", req.method, req.url, req.body);
  next();
});

app.use(function(err, req, res, next){ //Error handling
  console.error(err.stack);
  res.json(500, "Something broke!");
});


/* 
 * Add routes/paths to API 
 * Paths/routes seem to be searched for in a FIFO order - thus it is important that we register this route BEFORE registering the public folder, or else the public/test file will override the routes/test_router test 
 *
 * Available paths: 
 * test --> routers/test_router.js
 * everything in folder /public
 * 
*/

//Register router 'test_router.js' under path '/test'
//Paths/routes seem to be searched for in FIFO order - thus it is important that we register this route BEFORE registering the public folder, or else the public/test file will override the routes/test_router test 
var testRouter = require('./routes/test_router.js')(express); 
app.use('/test', testRouter)

//Register everything in the 'public' folder under root path '/'
//E.g. the 'public/channelList' file will be accessible by http GET '/channelList'
app.use('/', express.static(path.join(__dirname, 'public')));


/* Start server on port 7777 */
var server = app.listen(7777, function() {
  console.log('Listening on port %d', server.address().port);
});

