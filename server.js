/***************************/
/** Set Up *****************/
/***************************/

let express    = require('express');
let mongoose   = require('mongoose');
let bodyParser = require('body-parser');
let passport   = require('passport');
let Account    = require('./model/account');
var cors       = require('cors');

/***************************/
/*** Config App ************/
/***************************/

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.set('json spaces', 2); // make json response 'pretty'

/***************************/
/*** Passport **************/
/***************************/

const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
passport.use(new LocalStrategy({ usernameField: 'email', passwrodField: 'password' }, Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

/***************************/
/*** Controllers ***********/
/***************************/

app.use('/api/todo', require('./controller/todo'));
app.use('/api/account', require('./controller/account'));

/***************************/
/*** Start Server **********/
/***************************/

app.listen(8080);
