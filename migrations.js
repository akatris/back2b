'use strict';

const up = async function (db) {

    await db.createCollection('categories');
    await db.createCollection('users');
};

const down = async function (db) {

    await db.dropDatabase();
};

module.exports = { up, down };
