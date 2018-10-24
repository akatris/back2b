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

        test('payload id is required and should be valid', async () => {

            await reset();
            const pcop = { id: 'a', name: 'Cat', description: 'description' };
            let result = await server.inject({ method: 'POST', url: '/pcops', payload: pcop });
            expect(result.statusCode).to.equal(400);

            pcop.id = 0;
            result = await server.inject({ method: 'POST', url: '/pcops', payload: pcop });
            expect(result.statusCode).to.equal(400);

            pcop.id = 10000;
            result = await server.inject({ method: 'POST', url: '/pcops', payload: pcop });
            expect(result.statusCode).to.equal(400);
        });

        test('throw an error when id is already taken', async () => {

            const pcop = { id: 1, name: 'Cat', description: 'description' };
            let result = await server.inject({ method: 'POST', url: '/pcops', payload: pcop });
            expect(result.statusCode).to.equal(200);

            result = await server.inject({ method: 'POST', url: '/pcops', payload: pcop });
            expect(result.statusCode).to.equal(409);
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
