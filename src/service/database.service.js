const mongoose = require('mongoose');
const { mongodb } = require('../config');

mongoose.set('debug', mongodb.debug);

function connect() {

    const uri = mongodb.uri || `${mongodb.prefix}://${mongodb.hostname}:${mongodb.port}/${mongodb.authDb}`;
    const auth = mongodb.username ? { username: mongodb.username, password: mongodb.password } : null; 
    const dbName = mongodb.uri ? undefined : mongodb.database;
  
    // mongoose options
    const mongooseOptions = {
        auth,
        bufferCommands: false,
        dbName
    };

    // mongodb options
    const mongodbOptions = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    // poolSize,
    // minSize
    };

    return mongoose.connect(uri, {
        ...mongooseOptions,
        ...mongodbOptions
    });
}


function close() {
    return mongoose.disconnect();
}

module.exports = {
    connect,
    close
};