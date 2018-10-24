'use strict';

const Hapi = require('hapi');
const HapiAutoRoute = require('hapi-auto-route');
const MongoDB = require('./plugins/mongodb');

const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 4000
    });

    await server.register([{
        plugin: HapiAutoRoute
    }, {
        plugin: MongoDB,
        options: {
            uri: process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI,
            dbName: process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_DBNAME : process.env.MONGODB_DBNAME
        }
    }]);

    return server;
};

module.exports = { init };
