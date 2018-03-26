let express    = require('express');
let mongoose   = require('mongoose');
let passport   = require('passport');
let bodyparser = require('body-parser');
let database   = require('../db.js');
let Account    = require('../model/account');
let auth       = require('../middleware/auth.js');

let router = express.Router();
let connection = database();

/************************/
/** Register New User ***/
/************************/

router.post('/register', (req, res) => {
  Account.register(new Account({ username: req.body.email}), req.body.password, function(err, account) {
    if (err) {
      res.send(err);
    }

    passport.authenticate( 'local', { session: false}) (req, res, () => {
      res.status(200).send('Successfully created new account');
    });
  });
});

/************************/
/** Login ***************/
/************************/

router.post('/login', passport.authenticate(
  'local', { session: false, scope: [] }), auth.generateAccessToken, auth.respond);

/************************/
/** Logout **************/
/************************/

router.get('/logout', auth.authenticate, (req, res) => {
  res.logout();
  res.status(200).send('Successfully logged out');
});

/************************/
/** Get User Info *******/
/************************/

router.get('/me', auth.authenticate, (req, res) => {
  res.status(200).json(req.user);
});

/************************/
/** Export **************/
/************************/

module.exports = router;
