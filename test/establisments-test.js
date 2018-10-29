'use strict';

const Lab = require('lab');
const { expect } = require('code');

const { init } = require('../index');
const { reset } = require('../bootstrap-test');
const { createUser } = require('./_fixture/users');
const { createEstablishment } = require('./_fixture/establishments');

const { before, beforeEach, experiment, test } = exports.lab = Lab.script();

experiment('establishment', () => {

    let server = null;

    before(async () => {

        server = await init();
    });

    beforeEach(async () => {

        await reset();
    });

    experiment('POST /establishments', () => {

        test('returns 201 success', async () => {

            const user = await server.inject(createUser('test', 'password'));
            const userPayload = JSON.parse(user.payload);
            const result = await server.inject(createEstablishment('establishment', 100000, userPayload.data.id));
            const payload = JSON.parse(result.payload);

            expect(result.statusCode).equals(201);
            expect(result.headers['content-type']).equals('application/vnd.api+json');
            expect(result.headers.location).to.be.a.string();

            expect(payload.data).to.includes(['attributes', 'id', 'type', 'links']);
            expect(payload.data.attributes).to.includes(['name', 'funds', 'user_id']);

            expect(payload.data.attributes.name).equals('establishment');
            expect(payload.data.attributes.funds).equals(100000);
            expect(payload.data.attributes.user_id).equals(userPayload.data.id);
        });
    });
});
