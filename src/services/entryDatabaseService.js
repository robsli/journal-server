const debug = require('debug')('app:entryDbService');
const Entry = require('../models/Entry')
const sampleData = require('../sampleData')

exports.get_public_entries = async(req, res) => {
  let response
  try {
    response = await Entry.find({ user: 'public' })
    debug(response.length)
    if (response.length < 1) {
      debug('inserting sampleData')
      const insertSampleData = await Entry.create(sampleData)
        .then((resp) => {
          res.status(200).json(resp)
        })
        .catch((error) => {
          debug(error.stack)
          res.status(500).send(error.stack)
        })
    } else {
      res.status(200).json(response)
    }
  } catch(err) {
    debug(err.stack)
  }
}

exports.get_entries = async(req, res) => {
  debug(req.session.user)
  let response
  try {
    response = await Entry.find({ user: req.session.user._id })
    debug(response)
    res.status(200).json(response)
  } catch(error) {
    debug(error.stack)
    res.status(500).send(error.stack)
  }
}

exports.add_entry = async(req, res) => {
  let response
  const newEntry = Object.assign({}, req.body, { user: req.session.user._id } )
  debug(newEntry)
  try {
    response = await Entry.create(newEntry)
      .then((resp) => {
        res.status(200).json(resp)
      })
      .catch((err) => {
        debug(err.stack)
        res.status(500).error(err)
      })
  } catch(err) {
    debug(err.stack)
  }
}

exports.update_entry = async(req, res) => {
  let response
  try {
    response = await Entry.findByIdAndUpdate(req.body._id,
      {
        'name': req.body.name,
        'notes': req.body.notes,
        'lastModified': Date.now()
      }
    )
      .then((resp) => {
        res.status(200).json(resp)
      })
      .catch((err) => {
        debug(err.stack)
        res.status(500).error(err)
      })
  } catch(err) {
    debug(err.stack)
  }
}

exports.delete_entry = async(req, res) => {
  let response
  try {
    response = await Entry.findByIdAndRemove(req.body._id)
      .then((resp) => {
        res.status(200).json(resp)
      })
      .catch((err) => {
        debug(err.stack)
        res.status(500).error(err)
      })
  } catch(err) {
    debug(err.stack)
  }
}
