'use strict';

const DotEnv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    DotEnv.config();
}

const { init } = require('./index');

const start = async () => {

    const server = await init();
    await server.start();
};

start();
