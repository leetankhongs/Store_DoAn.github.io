var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let hbs = require('hbs');

let paginationHelpers = require('./helpers/pagination');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Use env file
require('dotenv').config();

// Connect db
const dbURL = process.env.DB_URL;
const mongoose = require('mongoose');
mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
	() => {
		console.log('KN THANH CONG')
	},
	err => { /** handle initial connection error */
		console.log(err);
	}
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

//Add helpers
hbs.registerHelper('usersPagination', paginationHelpers.makeUsersPagination);

module.exports = app;
