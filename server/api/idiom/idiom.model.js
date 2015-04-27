'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IdiomSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Idiom', IdiomSchema);