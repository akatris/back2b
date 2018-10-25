'use strict';

const Hapi = require('hapi');
const HapiAutoRoute = require('hapi-auto-route');
const MongoDB = require('./plugins/mongodb');

const internals = {};

internals.setErrorsContentType = function (request, h) {

    const response = request.response;

    if (!response.isBoom) {
        return h.continue;
    }

    const error = response.output;
    return h.response(response.source).type('application/vnd.api+json')
        .code(error.statusCode).message(error.message);
};

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

    server.ext('onPreResponse', internals.setErrorsContentType);

    return server;
};

module.exports = { init };
