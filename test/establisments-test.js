'use strict';


const Lab = require('lab');
const Server = require('../index');
const UserFixtures = require('./fixtures/users');
const EstablishmentFixtures = require('./fixtures/establishments');
const TokenFixtures = require('./fixtures/token');
const { expect } = require('code');


const { before, beforeEach, experiment, test } = exports.lab = Lab.script();


experiment('establishment', () => {

    let server = null;


    let ESTABLISHMENT_POST_CONFIG = {};
    let TOKEN_POST_CONFIG = {};


    let token = '';


    before(async () => {

        server = await Server();
    });


    beforeEach(async () => {

        await server.mongodb.reset();

        const USER_POST_CONFIG = UserFixtures.post();
        const user = await server.inject(USER_POST_CONFIG);

        TOKEN_POST_CONFIG = TokenFixtures.post(
            USER_POST_CONFIG.payload.data.attributes.username,
            USER_POST_CONFIG.payload.data.attributes.password
        );

        const tokenResult = await server.inject(TOKEN_POST_CONFIG);
        const tokenPayload = JSON.parse(tokenResult.payload);
        token = tokenPayload.data.id;

        const userPayload = JSON.parse(user.payload);
        ESTABLISHMENT_POST_CONFIG = EstablishmentFixtures.post(userPayload.data.id, `Bearer ${token}`);
    });


    experiment('POST /establishments', () => {

        test('returns 201 success', async () => {

            const result = await server.inject(ESTABLISHMENT_POST_CONFIG);
            const payload = JSON.parse(result.payload);

            expect(result.statusCode).equals(201);
            expect(result.headers['content-type']).equals('application/vnd.api+json');
            expect(result.headers.location).to.be.a.string();

            expect(payload.data).to.includes(['attributes', 'id', 'type', 'links']);
            expect(payload.data.attributes).to.includes(['name', 'funds', 'user_id']);
        });
    });
});
