const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes')
const appSettings = require('./configs/app-settings');
const app = express();
const port = '5000';

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api', routes)

// Global error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error caught from global handler', err)
  res.status(400).send(`There was a problem with your request, please try again. Message: ${err}`);
});

// DB setup
mongoose.connect(appSettings.mongoConfig.server, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully!`))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Survey API running on port ${port}!`))