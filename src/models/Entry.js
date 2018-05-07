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
      default: new Date,
      type: Date
    },
    user: {
      ref: 'User',
      type: Schema.ObjectId
    }
  });

module.exports = Entry = mongoose.model('Entry', EntrySchema);
