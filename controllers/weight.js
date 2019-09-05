const weightRouter = require('express').Router();
const Weight = require('../models/weight');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// @route GET api/weights
// @desc  Get all weights

weightRouter.get('/', (request, response) => {
  Weight.find().then(weights => response.json(weights));
});

// @route POST api/weights
// @desc  Add new weight measurement
weightRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

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
    response.json(savedMeasurement.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = weightRouter;
