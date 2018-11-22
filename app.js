var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes    = require('./routes/index');
var users     = require('./routes/users');
var Proc      = require('./routes/Proc');
var ProcTest      = require('./routes/ProcTest');
var pool      = require('./routes/pool');
var app = express();

//var work =  require('./routes/work');
//var test4 =  require('./routes/test');
//var DBConnect = require('./routes/DBConnect')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/Proc', Proc);
app.use('/ProcTest', ProcTest);


//app.use('/work', work);
//app.use('/test', test4);
//app.use('/DBConnect',DBConnect);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var E_NOCONNECT = 100;
var E_DB_ERROR = 101;
var ErrMsg = 0;

pool.CreatePool("Init", function(ErrMsg){

  console.log(" Init 하고 ErrMsg= ",ErrMsg);
  if(ErrMsg == E_NOCONNECT || ErrMsg == E_DB_ERROR  )
  {

      console.log("디비 접속실패로 인한 서비스 중지.")
      
  }
});



module.exports = app;
