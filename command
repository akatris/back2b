#!/usr/bin/env node

const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const {up} = require('./migrations');
const {Database, buildUrl} = require("./lib/database");

async function run() {
  const mongoUrl = buildUrl(process.env.MONGODB_HOST,
    process.env.MONGODB_PORT,
    process.env.MONGODB_DBNAME);
  const mongoTestUrl = buildUrl(process.env.TEST_MONGODB_HOST,
    process.env.TEST_MONGODB_PORT,
    process.env.TEST_MONGODB_DBNAME);

  const dbName = process.env.MONGODB_DBNAME;
  const dbNameTest = process.env.TEST_MONGODB_DBNAME;

  const database = new Database(mongoUrl, dbName);
  const testDatabase = new Database(mongoTestUrl, dbNameTest);

  await database.connect();
  await testDatabase.connect();

  if (process.argv[2] == 'migration') {
    if (process.argv[3] == 'up') {
      try {
        await up(database.get());
        await up(testDatabase.get());
      } catch (e) {
        console.log(e);
      }
    }
  }
  database.client.close();
  testDatabase.client.close();
}
// jksldf:w
run();

