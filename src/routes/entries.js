const express = require('express')
const router = express.Router()

const entry_controller = require('../controllers/entryController')
const auth_controller = require('../controllers/authController')

router.get('/', entry_controller.entry_list)

router.get('/getEntries', auth_controller.authorize_user, entry_controller.get_entries)

router.post('/addEntry', auth_controller.authorize_user, entry_controller.add_entry)

router.put('/updateEntry', auth_controller.authorize_user, entry_controller.update_entry)

router.delete('/deleteEntry', auth_controller.authorize_user, entry_controller.delete_entry)

module.exports = router
