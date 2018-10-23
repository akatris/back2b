'use strict';

const DotEnv = require('dotenv');
const Database = require('./lib/database');
const Migration = require('./lib/migration');
const { up, down } = require('./migrations');

DotEnv.config();

const reset = async function () {

    const database = new Database(process.env.TEST_MONGODB_URI,
        process.env.TEST_MONGODB_DBNAME);
    const migration = new Migration(database);
    await migration.run(down);
    await migration.run(up);
};

reset();
