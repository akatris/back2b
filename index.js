'use strict';

const Hapi = require('hapi');
const HapiAutoRoute = require('hapi-auto-route');
const MongoDB = require('./plugins/mongodb');

const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 3000
    });

    await server.register([HapiAutoRoute, MongoDB]);

    return server;
};

module.exports = { init };
