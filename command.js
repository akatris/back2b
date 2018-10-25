#!/usr/bin/env node
'use strict';

const DotEnv = require('dotenv');
const Migration = require('./lib/migration');
const Database = require('./lib/database');
const { up, down } = require('./migrations');

if (process.env.NODE_ENV !== 'production') {
    DotEnv.config();
}

const DATABASES = [{
    uri: process.env.TEST_MONGODB_URI,
    dbName: process.env.TEST_MONGODB_DBNAME
}, {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DBNAME
}];

const migrate = async function (databases, action) {

    const targets = databases.map(({ uri, dbName }) => {

        return new Database(uri, dbName);
    });

    for (const target of targets) {
        const migration = new Migration(target);
        await migration.run(action);
    }
};

const run = async function () {

    if (process.argv[2] === 'migration') {
        if (process.argv[3] === 'up') {
            await migrate(DATABASES, up);
        }

        if (process.argv[3] === 'down') {
            await migrate(DATABASES, down);
        }
    }
};

run();
