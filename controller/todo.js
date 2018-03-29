let express    = require('express');
let bodyParser = require('body-parser');
let mongoose   = require('mongoose');
let Todo       = require('../model/todo');
let database   = require('../db.js');
let auth       = require('../middleware/auth.js');

let router     = express.Router();
let connection = database();
let ObjectID = require("mongodb").ObjectID;

/**************************/
/** Get all Todos (Test) **/
/**************************/

router.get('/', (req, res) => {

  Todo.find({}, (err, todos) => {

    if (err) {
      res.status(500).send(err);
      return;
    }

    res.json(todos);
  });
});

/**********************/
/** Get User's Todos **/
/**********************/

router.get('/:id', auth.authenticate, (req, res) => {

  var id = ObjectID(req.params.id);

  Todo.find({ user: id }, (err, todos) => {

    if (err) {
      res.status(500).send(err);
      return;
    }

    res.json(todos);
  });
});

/************************/
/** Create a Todo *******/
/************************/

router.post('/', auth.authenticate, (req, res) => {

  var id = ObjectID(req.body.user);

  Todo.create({ title : req.body.title, done : req.body.done, user : id }, (err, todo) => {

      if (err) {
        res.status(500).send(err);
        return;
      }

      // return todos after creation
      Todo.find({ user: id }, (err, todos) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          res.json(todos);
      });
  });
});

/************************/
/** Delete a Todo *******/
/************************/

router.delete('/:todo_id', auth.authenticate, (req, res) => {
  
    Todo.remove({ _id : req.params.todo_id }, function(err, review) {

      if (err) {
        res.status(500).send(err);
        return;
      }

    });
});

/***************************/
/*** Export ****************/
/***************************/

module.exports = router;
