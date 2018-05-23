const express = require('express')
const router = express.Router()

const EntryDBService = require('../services/entryDatabaseService')
const AuthService = require('../services/authService')

router.get('/', EntryDBService.get_public_entries)

router.get('/getEntries', AuthService.authorize_user, EntryDBService.get_entries)

router.post('/addEntry', AuthService.authorize_user, EntryDBService.add_entry)

router.put('/updateEntry', AuthService.authorize_user, EntryDBService.update_entry)

router.delete('/deleteEntry', AuthService.authorize_user, EntryDBService.delete_entry)

module.exports = router
