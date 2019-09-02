const weightRouter = require('express').Router();
const Weight = require('../models/weight');

// @route GET api/weights
// @desc  Get all weights

weightRouter.get('/', (request, response) => {
  Weight.find().then(weights => response.json(weights));
});

// @route POST api/weights
// @desc  Add new weight measurement
weightRouter.post('/', (request, response) => {
  const newMeasurement = new Weight({
    weight: req.body.weight,
    date: req.body.date
  });

  newMeasurement.save().then(weight => res.json(weight));
});

module.exports = weightRouter;
