const Tour = require('../models/tourModel');

/*
philosophy of express: we should always work with middleware stack (pipeline)
as much as we can.
*/

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
    //the original data is wraped in envolpe object data{} ~ Jsend response formating
    data: {},
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params);
  res.status(200).json({
    status: 'success',
    data: {},
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {},
  });
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

/*
// This function(checkID)is no longer needed as mongoose validates id itself but this
// is pretty useful example of understanding how the middleware functions works
// that's why keeping it hear for reference.

// In param middleware function we also get the access to the fourth argument
// that is actually the value of the parameter in question

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
*/
