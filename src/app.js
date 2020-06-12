const express = require('express');
const logger = require('morgan');

const mainRoute = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', mainRoute);

module.exports = app;
