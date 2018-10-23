'use strict';

const Database = require('../lib/database');

exports.plugin = {
    name: 'mongodb',
    register: async (server, options) => {

        const database = new Database(options.uri, options.dbName);
        await database.connect();
        server.expose('database', database.get());
    }
};
