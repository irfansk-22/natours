const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
/**
 * Here express.json is a middleware, and middleware is basically just a function that
 * can modify the incoming request data. So it's called middlware because it stands between
 * so in the middle of the request and responses.
 */

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
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

  //  When we create the new object we never specify the ID of the new
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

// app.get('/api/v1/tours', getAllTour);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTour).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
