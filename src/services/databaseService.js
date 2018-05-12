const Entry = require('../models/Entry');
const SampleData = require('../sampleData');

exports.get_all_entries = async(req, res) => {
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
}

exports.add_entry = async(req, res) => {
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
}

exports.update_entry = async(req, res) => {
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
}

exports.delete_entry = async(req, res) => {
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
}
