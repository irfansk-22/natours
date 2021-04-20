const express = require('express');
const morgan = require('morgan');

//Route files
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

//Test middleware
// app.use((req, res, next) => {
//   console.log('Hello from the middleware!');
//   next();
// });

//Middle ware to manipulate request object. adding new property (currentTime) to the request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
