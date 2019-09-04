const weightRouter = require('express').Router();
const Weight = require('../models/weight');

// @route GET api/weights
// @desc  Get all weights

weightRouter.get('/', (request, response) => {
  Weight.find().then(weights => response.json(weights));
});

// @route POST api/weights
// @desc  Add new weight measurement
weightRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const measurement = new Weight({
    weight: body.weight,
    date: new Date(),
    user: user._id
  });

  const savedMeasurement = await measurement.save();
  user.weightMeasurements = user.weightMeasurements.concat(
    savedMeasurement._id
  );
  await user.save();
});

module.exports = weightRouter;
