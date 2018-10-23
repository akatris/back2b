#!/usr/bin/env node

const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const {up, down} = require('./migrations');
const {Database, buildUrl} = require("./lib/database");

const DATABASES = [{
  host: process.env.TEST_MONGODB_HOST,
  port: process.env.TEST_MONGODB_PORT,
  dbName: process.env.TEST_MONGODB_DBNAME
}, {
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,
  dbName: process.env.MONGODB_DBNAME
}];


async function connect({host, port, dbName}) {
  const mongoUrl = buildUrl(host, port, dbName);
  const database = new Database(mongoUrl, dbName);
  await database.connect();
  return database;
}

async function executeMigration(databaseInfo, action) {
  const database = await connect(databaseInfo);
  try {
    await action(database.get());
  } catch (e) {
    console.log(e);
  }
  database.client.close();
}

async function migrate(databases, action) {
  for (const database of databases) {
    await executeMigration(database, action);
  }

}

async function run() {
  if (process.argv[2] == 'migration') {
    if (process.argv[3] == 'up') {
      await migrate(DATABASES, up);
    }

    if (process.argv[3] == "down") {
      await migrate(DATABASES, down);
    }
  }
}

run();
