const express = require('express')
const debug = require('debug')('app:router')
const router = express.Router()

const AuthService = require('../services/authService')

router.get('/', (req, res) => {
  res.redirect('/entries/getEntries')
})

router.post('/authenticate', AuthService.authenticate_user)

router.post('/authorize', AuthService.authorize_user)

router.post('/logout', AuthService.logout)

router.post('/login', AuthService.login)

module.exports = router
