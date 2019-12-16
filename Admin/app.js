var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let hbs = require('hbs');

//Include helpers
let paginationHelpers = require('./helpers/pagination');
let stateHelpers = require('./helpers/state');

//Include routers
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let categoryRouter = require('./routes/categories');

//Include services
let categoryService = require('./services/categoryService');

//Create app
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

//Add layout related changes
app.use(function(req, res, next) {
  (async () => {
    res.locals.Categories = await categoryService.getAllCategories();
    next();
  })(); 
});

//Set up routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoryRouter);

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
hbs.registerHelper('pagination', paginationHelpers.makePagination);
hbs.registerHelper('activityState', stateHelpers.makeListItemState);

module.exports = app;
