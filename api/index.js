const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')
const app = express();
const port = '5000';

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API routes
app.use('/api', routes)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Global error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error caught', err)
  res.status(400).send('There was a problem with your request, please try again.');
});

app.listen(port, () => console.log(`Survey API running on port ${port}!`))