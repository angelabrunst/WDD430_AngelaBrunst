const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxDocumentId: { type: String },
    maxMessageId: { type: String },
    maxContactId: { type: String }
 });
 
 module.exports = mongoose.model('Sequence', sequenceSchema);