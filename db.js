const mongoose = require('mongoose');

module.exports = function() {
  let db = mongoose.connect('mongodb://admin:admin@ds123534.mlab.com:23534/may-todo');
  return db;
}
