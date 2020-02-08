'use strict';

const express =  require('express');
const bcrypt =  require('bcrypt');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');

const app = express();


let secret = 'yesilovecoding';
//Users Database
let users= {};

app.post('/signup',(req,res)=>{
 let user = req.body;
 if(!users[user.username]){
   user.password = await bcrypt.hash(req.body.password, 5);
   users[user.username] = user;

   let userObject = {
       username: user.username,
       isGreat: true,
   }
   let token = await jwt.sign(userObject, secret);
   res.status(200).send(token);

 }
 else {
     res.status(403).send('Username is already in use');
 }
})

app.post('/signin', async (req,res) =>{

    let basic = req.headers.authorization.split(' ').pop();

  // decodes to user:pass and splits it to an array
  let [user, password] = base64.decode(basic).split(':');

  //If the user is in the database, await the comparison and return that OR false
  let verified = users[user] ? await bcrypt.compare(password,users[user].password) : false;

  if (verified){
    let userObject = {
        username: user,
        isGreat: true,
    }
    let token = await jwt.sign(userObject, secret);

    res.status(200).send(token);
  }else {
      res.status(403),send('Access Denied');
  }

})

app.get('/secretStuff', auth,(req,res) => {
    
})

module.exports = {
    start: (port) => app.listen(port, () =>
    console.log(`Up on ${port}`))
}