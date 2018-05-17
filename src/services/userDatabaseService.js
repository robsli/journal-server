const debug = require('debug')('app:userDbService')
const User = require('../models/User')

exports.get_user = async(req, res) => {
  let response
  debug(req.params)
  try {
    response = await User.find(req.params)
    debug(response)

    if (response.length) {
      res.status(200).json(response)
    } else {
      res.status(404).send('User does not exist')
    }
  } catch (err) {
    res.status(500).send('Server error')
    debug(err.stack)
  }
}

exports.add_user = async(req, res) => {
  let response
  debug(req.body)
  try {
    response = await User.create(req.body)
      .then((resp) => {
        res.status(200).json(resp)
      })
      .catch((err) => {
        debug(err.stack)
        res.status(400).json("Provide password")
      })
  } catch(err) {
    debug(err.stack)
  }
}

exports.update_user = async(req, res) => {
  let response
  debug(req.body)
  try {
    response = await User.findByIdAndUpdate(req.session.user,
      {
        'password': req.body.password
      }
    )
    .then((response) => {
      res.status(200).json({ message: 'User updated' })
    })
    .catch((err) => {
      debug(err.stack)
      res.status(500).error(err)
    })
  } catch(err) {
    debug(err.stack)
  }
}
