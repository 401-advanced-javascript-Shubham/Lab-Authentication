'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//The schema definition for a user record

let SECRET = 'Ilovecoding';

const Users = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });
  
  
   //Pre middleware which converts a string password into a hashed password
  Users.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 5);
  });
  

// instance method
Users.methods.generateToken = function(user) {
    let tokenObject = {
        username: this.username
    };

    return jwt.sign(tokenObject,SECRET);
}

Users.statics.authenticateBasic = async function (username, password){
  let query = {username : username};
  let user = await this.findOne(query);
     if(user) {
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {return user;}
        else {throw 'Invalid User'};
     }
     else{
       throw "Invalid User";
     }
};
module.exports = mongoose.model('users',Users);