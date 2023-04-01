const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  joke: { type: String, required: true },
  answer: { type: String, required: true }
});

module.exports = mongoose.model('Entry', entrySchema);
