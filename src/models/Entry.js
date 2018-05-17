const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    name: {
      required: true,
      type: String
    },
    notes: {
      type: String
    },
    createdDate: {
      required: true,
      type: Date
    },
    lastModified: {
      default: Date.now,
      type: Date
    },
    user: {
      required: true,
      type: String
    }
  });

module.exports = Entry = mongoose.model('Entry', EntrySchema);
