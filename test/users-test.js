'use strict';

const Lab = require('lab');
const Server = require('../index');
const { expect } = require('code');
const Fixtures = require('./_helpers');

const { before, beforeEach, experiment, test } = exports.lab = Lab.script();


experiment('users', () => {

    let server = null;
    let POST_USER_CONFIG = {};    // used as parameter for server.inject(POST_CONFIG);
    let GET_USER_CONFIG = {};
    let GET_ALL_USER_CONFIG = {};

    before(async () => {

        server = await Server();
    });

    beforeEach(async () => {

        await server.mongodb.reset();
        POST_USER_CONFIG = Fixtures.users.post();
        GET_ALL_USER_CONFIG = Fixtures.users.all();

        // We need to get an Id
        const newUser = await server.inject(Fixtures.users.post());
        const newUserPayload = JSON.parse(newUser.payload);
        GET_USER_CONFIG = Fixtures.users.get(newUserPayload.data.id);
    });

    experiment('POST /users', () => {

        test('return 415 on invalid content type', async () => {

            delete POST_USER_CONFIG.headers['content-type'];
            let result = await server.inject(POST_USER_CONFIG);
            expect(result.statusCode).equal(415);

            POST_USER_CONFIG = Fixtures.users.post();
            delete POST_USER_CONFIG.headers.accept;
            result = await server.inject(POST_USER_CONFIG);
            expect(result.statusCode).equal(406);

            POST_USER_CONFIG = Fixtures.users.post();
            result = await server.inject(POST_USER_CONFIG);
            expect(result.statusCode).equal(201);
            expect(result.headers['content-type']).to.equals('application/vnd.api+json');
            expect(result.headers.location).to.exists();
        });

        test('return 201 on success', async () => {

            const result = await server.inject(POST_USER_CONFIG);
            const payload = JSON.parse(result.payload);
            expect(result.statusCode).equals(201);
            expect(payload.data).to.includes(['id', 'types', 'attributes', 'links']);
            expect(result.headers.location).to.be.a.string();
        });

        test('return 409 if username is already taken', async () => {

            await server.inject(POST_USER_CONFIG);
            const result = await server.inject(POST_USER_CONFIG);
            expect(result.statusCode).equals(409);
            expect(result.headers['content-type']).equal('application/vnd.api+json');
        });
    });


    experiment('GET /users/{id}', () => {

        test('return 200 on success', async () => {

            await server.inject(POST_USER_CONFIG);
            const result = await server.inject(GET_USER_CONFIG);
            const payload = JSON.parse(result.payload);
            expect(result.statusCode).equals(200);
            expect(payload.data).to.includes(['type', 'id', 'attributes']);
            expect(payload.links).to.includes('self').and.exists();
        });

        test('return 404 is user is not found', async () => {

            delete GET_USER_CONFIG.headers['content-type'];
            const result = await server.inject({
                method: 'GET', url: '/users/123456789a34512345654334', headers: GET_USER_CONFIG.headers
            });
            expect(result.statusCode).equals(404);
            expect(result.headers['content-type']).equals('application/vnd.api+json');
        });

        test('bad request', async () => {

            delete GET_USER_CONFIG.headers['content-type'];
            const result = await server.inject({
                method: 'GET', url: '/users/123456789a3451234565433', headers: GET_USER_CONFIG.headers
            });
            expect(result.statusCode).equals(400);
        });
    });

    experiment('GET /users', () => {

        test('retun 200 on success', async () => {


            const result = await server.inject(GET_ALL_USER_CONFIG);
            expect(result.statusCode).equals(200);

            const { data, links } = JSON.parse(result.payload);
            expect(data).array().and.not.empty();
            expect(links.self).string().and.exists();
            expect(result.headers['content-type']).equals('application/vnd.api+json');
        });
    });
});
