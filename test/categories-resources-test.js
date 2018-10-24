'use strict';

const Lab = require('lab');
const { expect } = require('code');

const { init } = require('../index');
const { reset } = require('../bootstrap-test');

const { before, beforeEach, experiment, test } = exports.lab = Lab.script();

experiment('/pcops/categories', () => {

    let server = null;
    let category = null;

    before(async () => {

        server = await init();
    });

    beforeEach(async () => {

        await reset();
        category = { id: 1, name: 'category name', description: 'category description' };
    });

    experiment('GET /pcop/categories/{id}', () => {

        test('routes exists', async () => {

            await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            const result = await server.inject('/pcop/categories/1');
            expect(result.statusCode).to.equal(200);
        });

        test('404 if the resource is not found', async () => {

            const result = await server.inject('/pcop/categories/1');
            expect(result.statusCode).to.equal(404);
        });
    });

    experiment('GET /pcop/categories', () => {

        test('routes exists', async () => {

            await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            const result = await server.inject('/pcop/categories');
            const payload = JSON.parse(result.payload);
            expect(result.statusCode).to.equal(200);
            expect(payload.data).to.be.an.array().and.have.length(1);
        });
    });

    experiment('POST /pcop/categories', () => {

        test('route exists', async () => {

            const result = await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            expect(result.statusCode).to.be.equal(201);
        });

        test('id should be valid', async () => {

            category.id = null;
            let result = await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            expect(result.statusCode).to.be.equal(400);

            category.id = 0;
            result = await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            expect(result.statusCode).to.be.equal(400);

            category.id = 10;
            result = await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            expect(result.statusCode).to.be.equal(400);
        });

        test('name should be valid', async () => {

            delete category.name;
            const result = await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            expect(result.statusCode).to.be.equal(400);
        });

        test('description should be valid', async () => {

            delete category.description;
            const result = await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            expect(result.statusCode).to.be.equal(201);
        });

        test('create success', async () => {

            const result = await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            const payload = JSON.parse(result.payload);
            expect(payload).includes(['data']);
        });

        test('should return 409 when id is already taken', async () => {

            // Save these in the database before.
            await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            const result = await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            expect(result.statusCode).to.be.equal(409);
        });

        test('name should be unique', async () => {

            // Ensure that name is taken.
            await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            category.id = 2;
            const result = await server.inject({ method: 'POST', url: '/pcop/categories', payload: category });
            expect(result.statusCode).to.be.equal(409);
        });
    });
});
