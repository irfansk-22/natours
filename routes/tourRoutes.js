const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

//In param middleware function we also get the access to the fourth argument 
//that is actually the value of the parameter in question
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
