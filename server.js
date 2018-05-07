const bodyParser = require('body-parser');
const debug = require('debug')('app');
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
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
const dbName = 'journal-entries';

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

// app.put('/updateEntry', (req, res) => {
//   debug(req.body);
//   (async function mongo() {
//     let client;
//     let response;
//     try {
//       client = await MongoClient.connect(localUrl);
//       debug('Connected correctly to database');

//       const db = client.db(dbName);
//       const collection = db.collection('entries');

//       response = await collection.updateOne(
//         { _id: new ObjectID(req.body._id) },
//         { $set: { 'name': req.body.name, 'notes': req.body.notes },
//           $currentDate: { lastModified: true } })
//         debug(response.message);
//         res.json(response);
//     } catch (err) {
//       debug(err.stack);
//       client.close();
//     }
//     client.close();
//   }())
// })

// app.delete('/deleteEntry', (req, res) => {
//   debug(req.body);
//   (async function mongo() {
//     debug('inside async mongo function');
//     let client;
//     let response;
//     try {
//       client = await MongoClient.connect(localUrl);
//       debug('Connected correctly to database');

//       const db = client.db(dbName);
//       const collection = db.collection('entries');

//       response = await collection.deleteOne({ _id: new ObjectID(req.body['_id']) })
//       debug(response.message);
//       res.json(response.message);
//     } catch(err) {
//       debug(err.stack);
//       client.close();
//     }
//     client.close();
//   }())
// });

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  debug(`Listening on port ${port}`);
});
