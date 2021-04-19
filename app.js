const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
/**
 * Here express.json is a middleware, and middleware is basically just a function that
 * can modify the incoming request data. So it's called middlware because it stands between
 * so in the middle of the request and responses.
 */
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  //ALWAYS USE NEXT() FUNCTION ELSE THE FUNCTION EXECUTION WILL STUCK AND
  // CLIENT WILL NEVER RECEIVE RESPONSE
  next();
});

//Middle ware to manipulate request object. adding new property (currentTime) to the request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
