'use strict';

const Hapi = require('hapi');
const HapiAutoRoute = require('hapi-auto-route');
const { MongoClient } = require('mongodb');

const server = Hapi.Server({
    host: 'localhost',
    port: 3000
});

const connect = async (action) => {

    const client = new MongoClient('mongodb://localhost:27017', {
        useNewUrlParser: true
    });
    try {
        await client.connect();
        console.log('connected correctly to server');

        const db = client.db('test');
        await action(db);
        return db;
    }
    catch (err) {
        console.log(err);
    }

    client.close();
    return null;
};

const init = async () => {

    await server.register(HapiAutoRoute);
    return server;
};

module.exports = { init, connect };

