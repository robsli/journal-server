const debug = require('debug')('app:entriesRouter');
const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const sampleData = require('../sampleData');
const Entry = require('../models/Entry');
const User = require('../models/User');

const entriesRouter = express.Router();

const localUrl = 'mongodb://localhost:27017';
const db = mongoose.connection;
db.on('error', console.error)

function router() {
  entriesRouter.get('entries', (req, res) => {
      const localUrl = 'mongodb://localhost:27017';
      mongoose.connect(localUrl);
      const db = mongoose.connection
      
      debug(req.body);
      (async function mongoose() {
        let client;
        let response;
        try {
          response = User.find();
          res.json(response);
        } catch (err) {
          res.send('Failed to connect');
          debug(err.stack);
        }
      }());
    })

  entriesRouter.route('addEntry')
    .post((req, res) => {
      debug(req.body);
      (async function mongo() {
        let client;
        let response;
        try {
          client = await MongoClient.connect(localUrl);
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
  return entriesRouter;
}

module.exports = router;
