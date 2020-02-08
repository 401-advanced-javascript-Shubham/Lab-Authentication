'use strict';

const base64 = require('base-64');

const users = require('./users.js');

module.exports = (req, res, next) => {

  if(!req.headers.authorization) {
    next('Invalid Login');
    return;
  }

  let basic = req.headers.authorization.split(' ').pop();

  // decodes to user:pass and splits it to an array
  let [user, password] = base64.decode(basic).split(':');
  users.authenticateBasic(user, password)
    .then( validUser => {
      req.token =  users.generateToken(validUser);
      next();
    })
    .catch(err =>{
      next('Invalid Login')

    })

  //If the user is in the database, await the comparison and return that OR false
  // let verified = users[user] ? await bcrypt.compare(password,users[user].password) : false;

  // if (verified){
  //   let userObject = {
  //       username: user,
  //       isGreat: true,
  //   }
  //   let token = await jwt.sign(userObject, secret);

  //   res.status(200).send(token);
  // }else {
  //     res.status(403),send('Access Denied');
  // }

}
