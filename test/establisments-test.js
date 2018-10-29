'use strict';

const Lab = require('lab');
const { expect } = require('code');

const Server = require('../index');
const UserFixtures = require('./fixtures/users');
const EstablishmentFixtures = require('./fixtures/establishments');

const { before, beforeEach, experiment, test } = exports.lab = Lab.script();

experiment('establishment', () => {

    let server = null;

    let ESTABLISHMENT_POST_CONFIG = {};

    before(async () => {

        server = await Server();
    });

    beforeEach(async () => {

        const user = await server.inject(UserFixtures.post());
        const userPayload = JSON.parse(user.payload);

        await server.mongodb.reset();
        ESTABLISHMENT_POST_CONFIG = EstablishmentFixtures.post(userPayload.data.id);
    });

    experiment('POST /establishments', () => {

        test('returns 201 success', async () => {

            const user = await server.inject(UserFixtures.post());
            const userPayload = JSON.parse(user.payload);
            const result = await server.inject(ESTABLISHMENT_POST_CONFIG);
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
