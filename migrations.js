'use strict';

const up = async function (db) {

    await db.createCollection('categories');
    await db.createCollection('accounts');
    await db.createCollection('subaccounts');
    await db.createCollection('rubrics');
};

const down = async function (db) {

    await db.dropDatabase();
};

module.exports = { up, down };
