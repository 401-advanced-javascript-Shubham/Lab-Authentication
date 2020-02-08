'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let SECRET =  'Ilovecoding';

let db = {};
let users = {};

//Mongo Pre-save Hook
users.save =  async function (record) {
    if (!db[record.username]){
        record.password = await bcrypt.hash(record.password, 5);
        db[record.username] = record;
        return Promise.resolve(record);
    }
    else{
    return Promise.reject();
    }

}

//Not an instance
users.generateToken = function(user) {
    let userObject = {
        username: user.username,
        isGreat: true,
    };
    let token = await jwt.sign(userObject,SECRET);

    return token;
}

users.authenticateBasic = async function (username, password){
    let valid = await bcrypt.compare(password, db[username].password)
    return valid ? Promise.resolve(db[username]) : Promise.reject();
};
module.exports = users;