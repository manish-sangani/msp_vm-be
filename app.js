var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];
//require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
//require('./server/config/passport')();

require('./server/config/routes')(app);
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// error handlers

// development error handler
// will print stacktrace
if (env === 'development') {
    console.log('dev env');
    app.use(function (err, req, res, next) {
        return res.status(err.status || 500).send('error', {
            message: err.message,
            error: err
        });
        //return res.send('error', {
        //  message: err.message,
        //  error: err
        //});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    return res.status(err.status || 500).send('error', {
            message: err.message,
            error: {}
        }
    );
    //res.status(send('error', {
    //  message: err.message,
    //  error: {}
    //});
});


module.exports = app;
