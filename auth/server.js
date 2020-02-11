'use strict';

const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const auth = require('./middleware/basic-auth-middleware.js');
const Users = require('./users.js')

const timestamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const errorHandler = require('./middleware/500.js');
const notFoundHandler = require('./middleware/404.js');

//Third party global middleware
app.use(cors());
app.use(morgan('dev'));


//Our middleware
app.use(express.json());
app.use(timestamp);
app.use(logger);

app.post('/signup',(req,res)=>{

let user = new Users(req.body);
  users.save(req.body)
    .then (user => {
      //make a token
      let token = users.generateToken(user);
      res.status(200).send(token)
    })
     .catch( err => {
       res.status(403).send('You cannot do this');
     })
 
});

app.post('/signin', auth, (req,res) => {
  res.status(200).send(req.token);
});

app.get('/secretStuff', auth,(req,res)
 => {
    res.send('you got mail');
})

// app.get('/secretStuff', auth, permission('delete'),(req,res)
//  => {
//     res.send('you got mail');
// })

// because these are defined last, they end up as catch-alls.
app.use('*', notFoundHandler);
app.use(errorHandler);

// Export an object with the whole server and a separate method that can start the server
module.exports = {
  //exporting app for testing
  apiServer: app,
  start: (port) => {
    app.listen(port, () => console.log(`Listening on ${port}`));
  }
};