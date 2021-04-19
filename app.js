const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());
/**
 * Here express.json is a middleware, and middleware is basically just a function that
 * can modify the incoming request data. So it's called middlware because it stands between
 * so in the middle of the request and responses.
 */

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLERS
const getAllTour = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  /*
  CHECKING FOR MULTIPLE PARAMETERS AND SETTING Y PARAM OPTIONAL
    app.get('/api/v1/tours/:id/:x/:y?', (req, res) => {
        console.log(req.params);
      });
  */

  // console.log(req.params);

  //converting number string in to the actuall number data type
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  /**
   * So it'll basically loop through the array, and in each of the
   * iterations, we'll have access to the current element,and we'll
   * return either true or false in each of the iterations.
   *
   * Now what the find() method will then do is that bascically, it
   * will create an array which only contains the element where this
   * comparison turns out to be ture.
   */

  //  console.log(!tour);
  //  console.log('******');
  //  console.log(tour);

  // if (id > tours.length) {
  // If there is no tour with that ID the tour variable will be undefined
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  // When we create the new object we never specify the ID of the new
  // object, the database usually takes care of that. So new object
  // automatically gets the new id.
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        //the original data is wraped in envolpe object data{}
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  /**
   * We have to verbs to update the data PUT and PATCH
   * with PUT we accept that our application receives the entire
   * new updated object,
   *
   * PATCH only updates the data that is changing.
   *
   */

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

// app.get('/api/v1/tours', getAllTour);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTES
const tourRoute = express.Router();
app.use('/api/v1/tours', tourRoute);
tourRoute.route('/').get(getAllTour).post(createTour);

/**
 * If we make a post request here then the middle ware below will
 * never execute as it comes after the post request middleware.
 * the post middle ware completes the request response cycle so
 * it never goes further to other middleware. in this case the
 * middleware below.
 *
 * However if we make a patch or delete request the middleware below
 * will execute as it is coming before those middlewares.
 *
 * SO THE ORDER IN WHICH MIDDLEWARES ARE PRSENT REALLY MATTERS IN EXPRESS.
 */
// app.use((req, res, next) => {
//   console.log('Hello from the middleware!');
//   next();
// });

tourRoute.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

const userRoute = express.Router();
app.use('/api/v1/users', userRoute);

userRoute.route('/').get(getAllUsers).post(createUser);
userRoute.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// 4) START SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
