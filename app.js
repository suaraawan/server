const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const musicsRouter = require('./routes/musics');
const cors = require('cors');

const mongoose = require ("mongoose");
require("dotenv").config();

const {DBUSER, DBPASS} = process.env;

const url = `mongodb://${DBUSER}:${DBPASS}@ds151530.mlab.com:51530/suaraawan`

// const url = 'mongodb://localhost/tugas-kelompok';

mongoose.connect(url, function(req, err){
    console.log("database connected");
})


const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/musics', musicsRouter);


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
