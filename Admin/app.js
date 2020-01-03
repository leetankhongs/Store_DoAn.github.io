const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

//doten
require('dotenv').config();
require('./handlers/cloudinary');

//Passport 
require('./Config/passport.js')(passport);

//Include helpers
let paginationHelpers = require('./helpers/pagination');
let stateHelpers = require('./helpers/state');
let miscellaneousHelpers = require('./helpers/misc');
let converMoneyHelpers = require('./helpers/convertMoney');

//Include routers
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let categoryRouter = require('./routes/categories');
let adminRouter = require('./routes/admin');
let ordersRouter = require('./routes/orders');

//Include services
let categoryService = require('./services/categoryService');

//Create app
var app = express();
app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
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

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

//connect flash

app.use(flash());

app.use((req, res, next) =>
{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

//Stuffs
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
app.use('/admin', adminRouter);
app.use('/orders', ordersRouter);

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
hbs.registerHelper('compareString', miscellaneousHelpers.compareString);
hbs.registerHelper('orderState', stateHelpers.makeOrdersListItemState);
hbs.registerHelper('compareIDs', miscellaneousHelpers.compareID);
hbs.registerHelper('_toStringMoney', converMoneyHelpers.convertMoney);
module.exports = app;
