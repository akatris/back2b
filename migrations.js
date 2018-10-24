'use strict';

const up = async function (db) {

    await db.createCollection('categories');
};

const down = async function (db) {

    await db.dropDatabase();
};

module.exports = { up, down };
