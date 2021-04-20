const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/**
 * philosophy of express: we should always work with middleware stack (pipeline)
 * as much as we can.
 */

exports.checkID = (req, res, next, val) => {
  // console.log(`Tour ID is : ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price',
    });
  }
  next();
};

exports.getAllTour = (req, res) => {
  // console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);

  // When we create the new object we never specify the ID of the new
  // object, the database usually takes care of that. So new object
  // automatically gets the new id.
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
