const debug = require('debug')('app:entryRoutes');
const express = require('express');
const { MongoClient } = require('mongodb');
const sampleData =require('../sampleData');

const entriesRouter = express.Router();

const url = 'mongodb://admin:test1234@ds161529.mlab.com:61529/journal-entries';
const dbName = 'journal-entries';

function router() {
  entriesRouter.route('entries')
    .get((req, res) => {
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
              // debug('Adding sample data since DB is empty');
            }
            response = await collection.find({}).toArray();
            res.json(response);
          } catch (err) {
            debug(err.stack);
            client.close();
          }
          client.close();
        }());
    })

  entriesRouter.route('saveEntry')
    .post((req, res) => {
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
    })
  return entriesRouter;
}

module.exports = router;
