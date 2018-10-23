'use strict';

const up = async function (db) {

    await db.createCollection('categories');
};

const down = async function (db) {

    await db.dropCollection('categories');
};

module.exports = { up, down };
