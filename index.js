'use strict';

require('dotenv').config()
const mongoose = require('mongoose');

const server = require('./api-server/lib/server.js');

const mongooseOptions = {
    useNewUrlParser:true,
    useCreateIndex: true,
  };

mongoose.connect(process.env.MONGODB_URI);

server.start(process.env.PORT || 3000);
