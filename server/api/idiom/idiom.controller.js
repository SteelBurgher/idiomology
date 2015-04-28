'use strict';

var _ = require('lodash');
var Idiom = require('./idiom.model');
var request = require('request');

var key = 'e37b5874-27cf-405d-8f49-2f2cc9a28919';
var ref = 'learners'

// Get list of idioms
exports.index = function(req, res) {
  Idiom.find(function (err, idioms) {
    console.log(idioms);
    if(err) { return handleError(res, err); }
    return res.json(200, idioms);
  });
};

// Get a single idiom
exports.show = function(req, res) {
  Idiom.findById(req.params.id, function (err, idiom) {
    if(err) { return handleError(res, err); }
    if(!idiom) { return res.send(404); }
    return res.json(idiom);
  });
};

var wordGetter = function(text) {
  return text.split(' ');
};
var grabDefinition = function (word, ref, key, cb) {
  request.get("http://www.dictionaryapi.com/api/v1/references/" + ref + "/xml/" + word + "?key=" + key)
    .on("response", function (response) {
      console.log(response);
    })
    .on("error", function(err) {
    });
};
// Creates a new idiom in the DB.
exports.create = function(req, res) {
  var wordArray = wordGetter(req.body.text);
  req.body.words = [];
  for(var i=0; i< wordArray.length; i++) {
    req.body.words.push({word: wordArray[i], def: ''});
  }
  Idiom.create(req.body, function(err, idiom) {
    if(err) { return handleError(res, err); }
    return res.json(201, idiom);
  });
};

// Updates an existing idiom in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Idiom.findById(req.params.id, function (err, idiom) {
    if (err) { return handleError(res, err); }
    if(!idiom) { return res.send(404); }
    var updated = _.merge(idiom, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, idiom);
    });
  });
};

// Deletes a idiom from the DB.
exports.destroy = function(req, res) {
  Idiom.findById(req.params.id, function (err, idiom) {
    if(err) { return handleError(res, err); }
    if(!idiom) { return res.send(404); }
    idiom.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.changeDef = function(req, res) {
  var idiomId = req.body.idiomId;
  var word = req.body.word;
  var newDefinition = req.body.newDefinition;

  Idiom.findById(idiomId, function (err, idiom) {
    for(var i = 0; i < idiom.words.length; i++) {
      if(idiom.words[i].word === word) {
        idiom.words[i].def = newDefinition;
        idiom.save(function(err) {
          if (err) console.log(err);
          else
            res.send(idiom);
        });
      }
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}