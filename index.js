'use strict';

require('dotenv').config();
const server = require('./auth/server-huge.js/index.js');

server.start(process.env.PORT);