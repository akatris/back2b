'use strict';

const Lab = require('lab');
const { expect } = require('code');

const { init } = require('../index');
const { reset } = require('../bootstrap-test');

const { before, beforeEach, experiment, test } = exports.lab = Lab.script();

experiment('establishment', () => {

    let server = null;
    let postObject = null;
    let headers = null;

    before(async () => {

        server = await init();
    });

    beforeEach(async () => {

        await reset();

        headers = { 'content-type': 'application/vnd.api+json', accept: 'application/vnd.api+json' };
        postObject = { method: 'POST', url: '/establishments', headers };
    });

    experiment('POST /establishments', () => {

        test('returns 200 success', async () => {

            const result = await server.inject(postObject);
            expect(result.statusCode).equals(201);
            expect(result.headers['content-type']).equals('application/vnd.api+json');
        });
    });
});
