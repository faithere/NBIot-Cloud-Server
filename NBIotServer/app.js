var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');
var modifyUserInfo = require('./routes/modifyUserInfo');
// var test = require('./routes/test');


// var SocketIO = require('./routes/SocketIO');
var deviceHistory = require('./routes/deviceHistory');
// var udpServer = require('./routes/Iot/UDPServer');
var deviceList = require('./routes/deviceList');
var createDevice = require('./routes/createDevice');
var debugDevice = require('./routes/debugDevice');
var staticsDeInfo = require('./routes/staticsDeInfo');
var cors = require('cors');


var app = express();



//app.use(cors({origin:'http://127.0.0.1:3000/coap'}));

// app.use(cors({
//     origin: function(ctx) {
//             return `http://127.0.0.1:3000/users/login`;
//     },
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
//     maxAge: 100,
//     credentials: true,
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
// }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
// app.use('/test', test);
//app.use('/devices', coap_routes);
// app.use('/SocketIO', SocketIO);
app.use('/deviceHistory',deviceHistory);
// app.use('/udpServer',udpServer);
app.use('/deviceList',deviceList);
app.use('/createDevice',createDevice);
app.use('/debugDevice',debugDevice);
app.use('/modifyUserInfo',modifyUserInfo);
app.use('/getStaticsDeInfo',staticsDeInfo);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// app.listen(8080, () => {
//     console.log("asdas");
// })

module.exports = app;
