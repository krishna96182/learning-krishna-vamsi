console.log("starting express with nodemon")
var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
const authorsRouter = require('./routes/authors');
const todoRouter = require('./routes/todo');
const carapiRouter = require('./routes/carapi');
const booksRouter = require('./routes/books')
const categoryRouter = require('./routes/category');
const imageController = require('./routes/Image');
const documentController = require('./routes/Document');
const videoController = require('./routes/Video');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/authors', authorsRouter);
app.use('/todo', todoRouter);
app.use('/carapi', carapiRouter);
app.use('/books', booksRouter);
app.use('/categories', categoryRouter);
app.use('/uploads/images', imageController);
app.use('/uploads/documents', documentController);
app.use('/uploads/videos', videoController);
let mongoConnUrl = "mongodb://localhost/ascendion";
mongoose.connect(mongoConnUrl);
let db = mongoose.connection;
db.on("error", function() {
  console.log("Error came");
});
db.on("connected", function() {
  console.log("connected to mongoose")
});
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

module.exports = app;
