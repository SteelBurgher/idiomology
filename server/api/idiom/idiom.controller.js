'use strict';

var _ = require('lodash');
var Idiom = require('./idiom.model');

// Get list of idioms
exports.index = function(req, res) {
  Idiom.find(function (err, idioms) {
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

// Creates a new idiom in the DB.
exports.create = function(req, res) {
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

function handleError(res, err) {
  return res.send(500, err);
}