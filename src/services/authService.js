const bcrypt = require('bcrypt')
const debug = require('debug')('app:authService')
const mongoose = require('mongoose')
const User = require('../models/User')

exports.authenticate_user = async(req, res) => {
  let response
  debug('authenticating user')
  if (!req.session.user) {
    res.clearCookie('user_id')
    res.status(401).json({ username: '' })
  } else {
    try {
      response = await User.findById(req.session.user._id)
      debug(response)
      if (response.username) {
        res.status(200).json({ username: response.username })
      } else {
        res.clearCookie('user_id')
        res.status(404).json({ username: '' })
      }
    } catch(err) {
      debug(err.stack)
      res.status(500).json({ message: 'Service unavailable' })
    }

  }
}

exports.authorize_user = async(req, res, next) => {
  let response
  debug('authorizing user')
  if (!req.session.user) {
    debug('User not logged in, redirecting')
    res.redirect('/entries')
  } else {
    try {
      debug(req.session.user._id)
      response = await User.findById(req.session.user._id)
      debug(response)
      if (response._id) {
        debug('User authorized')
        next()
      } else {
        res.status(404).send('User not found')
      }
    } catch(err) {
      debug(err.stack)
      res.status(401).send('Invalid user, please log in and try again')
    }
  }
}

exports.login = async(req, res) => {
  let response
  debug(req.body)
  const username = req.body.username
  const password = req.body.password

  try {
    response = await User.findOne({ username: username })
    debug(response)

    if (response._id) {
      const match = await bcrypt.compare(password, response.password)
      if (match) {
        debug('Matched!')
        req.session.user = response
        debug(req.session)
        res.status(200).json({ username: response.username })
      } else {
        res.status(401).send('Password is incorrect')
      }
    } else {
      res.status(404).send('Username not valid')
    }
  } catch(err) {
    debug(err.stack)
    res.status(401).send('User is not authenticated')
  }
}

exports.logout = async(req, res) => {
  if (req.session.user && req.cookies.user_id) {
    debug('Logging out!')
    res.clearCookie('user_id')
    res.status(200).send('User logged out')
  }
  res.status(304).send('User is already logged out')
}
