'use strict';

const up = async function (db) {

    await db.createCollection('categories');
};

const down = function (db) {

    console.log('down');
};

module.exports = { up, down };
