// Copyright (c) 2018 Sitraka Ratsimba
'use strict';

const Lab = require('lab');
const Database = require('../lib/database.js');

const { expect } = require('code');

const { before, experiment, test } = exports.lab = Lab.script();

experiment('Database', () => {

    let database = null;

    before(() => {

        // We expect that users have'not deleted the database test :D
        database = new Database('mongodb://localhost:27017/test');
    });

    test('connect() sets url and dbName', async () => {

        await database.connect();
        expect(database.client.isConnected()).to.be.true();
    });

    test('connect() returns the database connection', async () => {

        // I'm am pretty sure that example.com does not use mongo :D
        const db = await database.connect();
        expect(db).to.be.not.null().and.not.undefined();
    });

    test('get() returns a connection to the database', async () => {

        await database.connect();
        expect(database.get()).to.be.not.null().and.not.undefined();
    });
});
