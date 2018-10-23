'use strict';

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'cafpadb';

const connect = async () => {

    const client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect();
        return client.db(dbName);
    }
    catch (error) {}
};

exports.plugin = {
    name: 'mongodb',
    register: async (server, options) => {

        const db = await connect();
        server.expose('db', db);
    }
};
