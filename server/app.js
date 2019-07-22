"use strict";
const createError = require('http-errors')
const express = require('express');
const path = require('path');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const routes = require("./routes")
const port = process.env.PORT || 3001;
const app = express();
const passport = require("passport");
const DATABASE_URI = require(path.join(__dirname, './env')).DATABASE_URI;

const basicAuth = require("./auth/basic-auth");
const errorHandler = require('./auth/error-handler');

// Define middleware here

// use basic HTTP auth to secure the api
app.use(basicAuth);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser
app.use(errorHandler);



// TODO: passport JWT??
app.use(routes);
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + ' public/index.html'));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
});
// Connect to the Mongo DB
mongoose.connect(DATABASE_URI, { useNewUrlParser: true }, console.log("mongoose good"));
app.listen(port, function () {
    console.log('Server started on port: ' + port);
});
module.exports = app;
