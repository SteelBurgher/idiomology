'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IdiomSchema = new Schema({
  text: String,
  words: [],
  context: String,
  origin: String, 
  example: String
});

module.exports = mongoose.model('Idiom', IdiomSchema);