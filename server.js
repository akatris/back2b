'use strict';

const DotEnv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    DotEnv.config();
}

const Server = require('./index');

const start = async () => {

    const server = await Server();
    await server.start();
};

start();
