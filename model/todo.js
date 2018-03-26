var mongoose = require('mongoose');
var Account  = require('./account');
let Schema   = mongoose.Schema;

let todoSchema = new Schema({
  title: String,
  done: Boolean,
  user: {type: Schema.Types.ObjectId, ref: 'Account'}
});

/***************************/
/*** Export ****************/
/***************************/

module.exports = mongoose.model('Todo', todoSchema);
