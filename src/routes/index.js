const express = require('express')
const debug = require('debug')('app:router')
const router = express.Router()

const auth_controller = require('../controllers/authController')

router.get('/', (req, res) => {
  res.redirect('/entries/getEntries')
})

router.post('/authenticate', auth_controller.authenticate_user)

router.post('/authorize', auth_controller.authorize_user)

router.post('/logout', auth_controller.logout)

router.post('/login', auth_controller.login)

module.exports = router
