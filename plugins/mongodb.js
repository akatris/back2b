'use strict';

const Database = require('../lib/database');

exports.plugin = {
    name: 'mongodb',
    register: async (server, options) => {

        const database = new Database(options.uri, options.dbName);
        await database.connect();

        const getDatabase = function () {

            return database.get();
        };

        server.expose('database', database.get());
        server.method('getDatabase', getDatabase);
    }
};
