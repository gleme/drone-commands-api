const express = require('express');
const logger = require('morgan');
const boom = require('express-boom');
const helmet = require('helmet');
const passport = require('passport');
const _ = require('lodash');

const strategies = require('./services/auth/strategies');
const routes = require('./routes');

const app = express();

passport.use(strategies.local.name, strategies.local.strategy);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(boom());
app.use(passport.initialize());
app.use(helmet());

/**
 * API Routes
 */
app.use('/', routes);


/**
 * Resource Not Found Error Handler
 */
app.use((req, res, next) => {
    res.boom.notFound();
});
  
/**
 * Default Error Handler
 */
app.use((error, req, res, next) => {

    // set locals, only providing error in development
    // res.locals.message = error.message;
    // res.locals.error = req.app.get('env') === 'development' ? error : {};
    
    console.error('failed to respond', error);
    const message = _.get(error, 'message', 'Internal Server Error');
    res.boom.badImplementation(message);
});

module.exports = app;
