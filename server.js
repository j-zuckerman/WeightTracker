const app = require('./app');
const http = require('http');
const config = require('./utils/config');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Weight = require('./models/weight');
app.use(cors());

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

//POST route for adding weight measurement
app.post('/api/weight', (request, response) => {
  const body = request.body;

  if (body.weight === undefined) {
    return response.status(400).json({ error: 'weight measurement missing' });
  }

  const weight = new Weight({
    weight: body.weight,
    date: new Date()
  });

  weight.save().then(savedWeight => {
    response.json(savedWeight.toJSON());
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
