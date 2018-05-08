const bodyParser = require('body-parser');
const debug = require('debug')('app');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const sampleData =require('./src/sampleData');

const Entry = require('./src/models/Entry');
const User = require('./src/models/User');

const app = express();

app.use(morgan('tiny'));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const localUrl = 'mongodb://localhost:27017';
const mlabUrl = 'mongodb://admin:test1234@ds161529.mlab.com:61529/journal-entries';

mongoose.connect(mlabUrl);
mongoose.Promise = global.Promise;
const mongooseDb = mongoose.connection
mongooseDb.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const entriesRouter = require('./src/routes/entriesRouter');
// app.use('/', entriesRouter);

app.get('/entries', (req, res) => {
  (async function mongoose() {
    let response;
    try {
      response = await Entry.find();

      if (response.length < 1) {
        debug(sampleData);
        const insertSampleData = await Entry.create(sampleData)
          .then((resp) => {
            res.json(resp);
          })
          .catch((error) => {
            debug(error.stack);
            res.status(500).error(error);
          })
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      debug(err.stack);
    }
  }());
});

app.post('/addEntry', (req, res) => {
  debug(req.body);
  (async function mongoose() {
    let response;
    try {
      response = await Entry.create(req.body)
        .then((resp) => {
          res.status(200).json(resp);
        })
        .catch((err) => {
          debug(err.stack);
          res.status(500).error(err);
        })
    } catch (err) {
      debug(err.stack);
    }
  }())
});

app.put('/updateEntry', (req, res) => {
  debug(req.body);
  (async function mongoose() {
    let response;
    try {
      response = await Entry.findByIdAndUpdate(req.body._id,
        {
          'name': req.body.name,
          'notes': req.body.notes,
          'lastModified': Date.now()
        }
      )
        .then((resp) => {
          res.status(200).json(resp);
        })
        .catch((err) => {
          debug(err.stack);
          res.status(500).error(err);
        })
    } catch(err) {
      debug(err.stack);
    }
  }())
});

app.delete('/deleteEntry', (req, res) => {
  debug(req.body);
  (async function mongoose() {
    let response;
    try {
      response = await Entry.findByIdAndRemove(req.body._id)
        .then((resp) => {
          res.status(200).json(resp);
        })
        .catch((err) => {
          debug(err.stack);
          res.status(500).error(err);
        })
    } catch(err) {
      debug(err.stack);
    }
  }())
});

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  debug(`Listening on port ${port}`);
});
