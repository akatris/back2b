'use strict';


const Lab = require('lab');
const Server = require('../index');
const PcopFixtures = require('./fixtures/pcops');
const CategoryFixtures = require('./fixtures/categories');
const TokenFixtures = require('./fixtures/token');
const UserFixtures = require('./fixtures/users');
const { expect } = require('code');


const { beforeEach, experiment, test } = exports.lab = Lab.script();


experiment('pcop route', () => {

    let server = null;
    let token = null;

    beforeEach(async () => {

        server = await Server();
        await server.mongodb.reset();
        await server.inject(CategoryFixtures.post(1));
        const userResult = await server.inject(UserFixtures.post());
        const userPayload =  JSON.parse(userResult.payload);
        const tokenResult = await server.inject(TokenFixtures.post(userPayload.data.attributes.username, 'password'));
        const tokenPayload = JSON.parse(tokenResult.payload);
        token = tokenPayload.data.id;
    });

    experiment('POST /pcop', () => {

        test('return 404 when parent does not exists', async () => {

            const result = await server.inject(PcopFixtures.post(21, `Bearer ${token}`));
            expect(result.statusCode).equals(404);
        });

        test('return 404 when type is unknown', async () => {

            const result = await server.inject(PcopFixtures.post(11111, `Bearer ${token}`));
            expect(result.statusCode).equals(404);
        });

        test('return 201 on success', async () => {

            const result = await server.inject(PcopFixtures.post(11, `Bearer ${token}`));
            expect(result.statusCode).equals(201);
            const payload = JSON.parse(result.payload);
            expect(payload.data.id).exists();
        });
    });
});
