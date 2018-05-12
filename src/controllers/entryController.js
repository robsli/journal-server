const DatabaseService = require('../services/databaseService');

exports.entry_list = DatabaseService.get_all_entries;

exports.entry_add = DatabaseService.add_entry;

exports.entry_update = DatabaseService.update_entry;

exports.entry_delete = DatabaseService.delete_entry;
