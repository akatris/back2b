'use strict';

const Lab = require('lab');
const { expect } = require('code');

const Pcop = require('../lib/pcop');
const { init } = require('../index');
const { reset } = require('../bootstrap-test');

const { before, beforeEach, experiment, test } = exports.lab = Lab.script();

experiment('/pcops', () => {

    let server;
    let db;

    let category = null;
    let account = null;
    let subaccount = null;
    let rubric = null;

    before(async () => {

        server = await init();
        db = server.plugins.mongodb.database;

        category = new Pcop({ id: 9, name: 'Category', description: 'Description' });
        account = new Pcop({ id: 99, name: 'Category', description: 'Description' });
        subaccount = new Pcop({ id: 999, name: 'Category', description: 'Description' });
        rubric = new Pcop({ id: 9999, name: 'Category', description: 'Description' });
    });

    beforeEach(async () => {

        await reset();
    });

    experiment('POST /pcops', () => {

        test('route exists', async () => {

            await reset();
            const pcop = { id: 9, name: 'Cat', description: 'description' };
            const result = await server.inject({ method: 'POST', url: '/pcops', payload: pcop });
            expect(result.statusCode).to.equal(200);
        });
    });

    experiment('GET /pcops', () => {

        test('route exists', async () => {

            await category.save(db);
            await account.save(db);
            await subaccount.save(db);
            await rubric.save(db);

            const result = await server.inject('/pcops');
            const payload = JSON.parse(result.payload);
            expect(result.statusCode).to.equal(200);
            expect(payload.data).to.includes(['categories', 'accounts', 'subaccounts', 'rubrics']);
        });
    });
});
