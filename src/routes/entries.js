const express = require('express')
const router = express.Router()

const entry_controller = require('../controllers/entryController')
const index_controller = require('../controllers/indexController')

router.get('/', entry_controller.entry_list)

router.get('/getEntries', index_controller.authorize_user, entry_controller.get_entries)

router.post('/addEntry', index_controller.authorize_user, entry_controller.add_entry)

router.put('/updateEntry', index_controller.authorize_user, entry_controller.update_entry)

router.delete('/deleteEntry', index_controller.authorize_user, entry_controller.delete_entry)

module.exports = router
