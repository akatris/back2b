'use strict';

const { init } = require('./index');

const start = async () => {

    const server = await init();
    await server.start();
};

start();
