const bodyParser = require('body-parser');
const debug = require('debug')('app');
const express = require('express');
const morgan = require('morgan');
const { MongoClient, ObjectID } = require('mongodb');
const sampleData =require('./src/sampleData');

const app = express();

app.use(morgan('tiny'));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const url = 'mongodb://admin:test1234@ds161529.mlab.com:61529/journal-entries';
const dbName = 'journal-entries';

app.get('/entries', (req, res) => {
  debug(req.body);
  (async function mongo() {
    let client;
    let response;
    try {
      client = await MongoClient.connect(url);
      debug('Connected correctly to database');
  
      const db = client.db(dbName);
      const collection = db.collection('entries');

      if (await collection.count() === 0) {
        response = await collection.insertMany(sampleData);
        // debug('Added sample data');
        // debug(response);
      }
      response = await collection.find({}).toArray();
      res.json(response);
    } catch (err) {
      debug(err.stack);
      client.close();
    }
    client.close();
  }());
});

app.post('/addEntry', (req, res) => {
  debug(req.body);
  (async function mongo() {
    let client;
    let response;
    try {
      client = await MongoClient.connect(url);
      debug('Connected correctly to database');

      const db = client.db(dbName);
      const collection = db.collection('entries');

      response = await collection.insertOne(req.body);
      debug(response.ops);
      res.json(response.ops);
    } catch (err) {
      debug(err.stack);
      client.close();
    }
    client.close();
  }())
});

app.put('/updateEntry', (req, res) => {
  debug(req.body);
  (async function mongo() {
    let client;
    let response;
    try {
      client = await MongoClient.connect(url);
      debug('Connected correctly to database');

      const db = client.db(dbName);
      const collection = db.collection('entries');

      response = await collection.updateOne(
        { _id: new ObjectID(req.body._id) },
        { $set: { 'name': req.body.name, 'notes': req.body.notes },
          $currentDate: { lastModified: true } })
        debug(response.message);
        res.json(response);
    } catch (err) {
      debug(err.stack);
      client.close();
    }
    client.close();
  }())
})

app.delete('/deleteEntry', (req, res) => {
  debug(req.body);
  (async function mongo() {
    debug('inside async mongo function');
    let client;
    let response;
    try {
      client = await MongoClient.connect(url);
      debug('Connected correctly to database');

      const db = client.db(dbName);
      const collection = db.collection('entries');

      response = await collection.deleteOne({ _id: new ObjectID(req.body['_id']) })
      debug(response.message);
      res.json(response.message);
    } catch(err) {
      debug(err.stack);
      client.close();
    }
    client.close();
  }())
});

app.listen(3001, () => {
  debug(`Listening on port 3001`);
});
