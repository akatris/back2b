#!/usr/bin/env node

const dotenv = require('dotenv');
const {MongoClient} = require('mongodb');
const {up} = require('./migrations');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

function getMongoUrl(env) {
  let url = {};
  if (env == 'test') {
    url = {
      host: process.env.TEST_MONGODB_HOST,
      port: process.env.TEST_MONGODB_PORT,
      dbName: process.env.TEST_MONGODB_DBNAME,
    };
  } else {
    url = {
      host: process.env.MONGODB_HOST,
      port: process.env.MONGODB_PORT,
      dbName: process.env.MONGODB_DBNAME,
    };
  }
  return `mongodb://${url.host}:${url.port}/${url.dbName}`;
}

function getDbName(env) {
  return env == 'test'
    ? process.env.TEST_MONGODB_DBNAME
    : process.env.MONGODB_DBNAME;
}

async function getDatabase(client, env) {
  try {
    await client.connect();
    console.log(getDbName(env));
    const db = client.db(getDbName(env));
    return db;
  } catch (e) {
    console.log(e);
  }
  return null;
}

async function run() {
  const client = new MongoClient(getMongoUrl());
  const clientTest = new MongoClient(getMongoUrl('test'));
  const testDB = await getDatabase(clientTest, 'test');
  const db = await getDatabase(client);
  if (process.argv[2] == 'migration') {
    if (process.argv[3] == 'up') {
      try {
        await up(db);
        await up(testDB);
      } catch (e) {
        console.log(e);
      }
    }
  }
  client.close();
  clientTest.close();
}

run();

