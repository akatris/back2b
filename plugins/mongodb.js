'use strict';


// TODO: Create an isolated environment for testing purpose.


const Joi = require('joi');
const Hoek = require('hoek');
const { MongoClient, ObjectId } = require('mongodb');


const internals = {};


internals.optionsSchema = Joi.object().keys({
    uri: Joi.string().default('mongodb://localhost:27017/test'),
    dbName: Joi.string().default('test')
});


exports.plugin = {
    name: 'mongodb',
    register: async (server, options) => {

        const client = new MongoClient(options.uri, { useNewUrlParser: true });
        await client.connect();
        Hoek.assert(client.isConnected(), 'Could not connect to the database.');

        const database = client.db(options.dbName);
        const reset = async () => await database.dropDatabase(database);  // Used drop database inside test.

        const decoration = { database, reset, ObjectId, client };
        server.decorate('server', 'mongodb', decoration);
        server.decorate('request', 'mongodb', decoration);
    }
};
