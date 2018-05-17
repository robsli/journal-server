const express = require('express')
const debug = require('debug')('app:router')
const router = express.Router()

const index_controller = require('../controllers/indexController')

router.post('/logout', index_controller.logout)

router.post('/login', index_controller.authenticate_user)

router.get('/', (req, res) => {
  res.redirect('/entries/getEntries')
})

module.exports = router
