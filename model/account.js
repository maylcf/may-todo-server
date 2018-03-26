var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema;

let Account = new Schema({
  email: String,
  password: String
});

Account.plugin(passportLocalMongoose);

/***************************/
/*** Export ****************/
/***************************/

module.exports = mongoose.model('Account', Account);
