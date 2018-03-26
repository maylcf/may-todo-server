var express    = require('express');
var jwt        = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var mongoose   = require('mongoose');

const TOKENTIME = 60 * 60 * 24 * 30; // 30 days
const SECRET = 'MAYLCFSECRET'

let authenticate = expressJwt({ secret: SECRET });

let generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({ id: req.user.id }, SECRET, { expiresIn: TOKENTIME } );
  next();
}

let respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  });
}

/***************************/
/*** Export ****************/
/***************************/

module.exports = {authenticate, generateAccessToken, respond}
