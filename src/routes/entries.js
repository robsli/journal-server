const express = require('express');
const router = express.Router();

const entry_controller = require('../controllers/entryController');

router.get('/entries', entry_controller.entry_list);

router.post('/addEntry', entry_controller.entry_add);

router.put('/updateEntry', entry_controller.entry_update);

router.delete('/deleteEntry', entry_controller.entry_delete);

module.exports = router;
