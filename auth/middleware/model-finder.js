'use strict';

const fs =  require('fs');

module.exports = (req,res,next) => {
    //sanitize
    let model = req.params.model.replace(/[^a-z0-9-_]/gi, '');
    let modelFileName = `${__dirname}/../models/${model}/${model}-collection.js`
    req.model = require(modelFileName);
    next();

    if(fs.existsSync(modelFileName)) {
      req.model = require(modelFileName);
      next();
    }
    else {
        next('Invalid Model Specified');
    }
}

