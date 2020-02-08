'use strict';

const express =  require('express');

const auth = require('./basic-auth-middleware.js');
const users = require('./users.js')
const app = express();

app.use(express.json());

app.post('/signup',(req,res)=>{


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

module.exports = {
    start: (port) => app.listen(port, () =>
    console.log(`Up on ${port}`))
}