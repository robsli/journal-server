const EntryDBService = require('../services/entryDatabaseService')

exports.entry_list = EntryDBService.get_public_entries

exports.get_entries = EntryDBService.get_entries

exports.add_entry = EntryDBService.add_entry

exports.update_entry = EntryDBService.update_entry

exports.delete_entry = EntryDBService.delete_entry
