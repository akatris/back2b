'use strict';

const Lab = require('lab');
const { expect } = require('code');

const { init } = require('../index');
const { reset } = require('../bootstrap-test');

const { before, beforeEach, experiment, test } = exports.lab = Lab.script();

experiment('POST /pcops', () => {

    let server;

    before(async () => {

        server = await init();
    });

    beforeEach(async () => {

        await reset();
    });

    test('route exists', async () => {

        const pcop = { id: 1, name: 'Cat', description: 'description' };
        const result = await server.inject({ method: 'POST', url: '/pcops', payload: pcop });
        expect(result.statusCode).to.equal(200);
    });
});
