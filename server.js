const bodyParser = require('body-parser');
const debug = require('debug')('app');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const sampleData =require('./src/sampleData');

const Entry = require('./src/models/Entry');
const User = require('./src/models/User');

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(morgan('dev'));
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'userActions.log'), { flags: 'a'})
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const localUrl = 'mongodb://localhost:27017';
const mlabUrl = 'mongodb://admin:test1234@ds161529.mlab.com:61529/journal-entries';

mongoose.connect(mlabUrl);
mongoose.Promise = global.Promise;
const mongooseDb = mongoose.connection
mongooseDb.on('error', console.error.bind(console, 'MongoDB connection error:'));

const entriesRoute = require('./src/routes/entries');
app.use('/', entriesRoute);

// TODO: Write tests, error handling

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  debug(`Listening on port ${port}`);
});
