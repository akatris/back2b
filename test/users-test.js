'use strict';

const Lab = require('lab');
const Server = require('../index');
const { expect } = require('code');


const { before, beforeEach, experiment, test } = exports.lab = Lab.script();


experiment('users', () => {

    let server = null;
    let requestPayload = null;
    let headers = {};
    before(async () => {

        server = await Server();
        requestPayload = {
            data: {
                type: 'users',
                attributes: {
                    username: 'username',
                    password: 'password'
                }
            }
        };
    });

    beforeEach(async () => {

        await server.mongodb.reset();
        headers = { accept: 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' };
    });

    experiment('POST /users', () => {

        test('return 415 on invalid content type', async () => {

            delete headers['Content-Type'];
            let result = await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });
            expect(result.statusCode).equal(415);
            headers['Content-Type'] = 'application/vnd.api+json';

            delete headers.accept;
            result = await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });
            expect(result.statusCode).equal(406);
            headers.accept = 'application/vnd.api+json';

            result = await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });
            expect(result.statusCode).equal(201);
            expect(result.headers['content-type']).to.equals('application/vnd.api+json');
            expect(result.headers.location).to.exists();
        });

        test('return 201 on success', async () => {

            const result = await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });
            const payload = JSON.parse(result.payload);
            expect(result.statusCode).equals(201);
            expect(payload.data).to.includes(['id', 'types', 'attributes', 'links']);
            expect(result.headers.location).to.be.a.string();
        });

        test('return 409 if username is already taken', async () => {

            await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });
            const result = await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });
            expect(result.statusCode).equals(409);
            expect(result.headers['content-type']).equal('application/vnd.api+json');
        });
    });


    experiment('GET /users/{id}', () => {

        test('return 200 on success', async () => {

            delete headers['content-type'];
            const inserted = await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });
            const result = await server.inject({ method: 'GET', url: inserted.headers.location, headers });
            const payload = JSON.parse(result.payload);
            expect(result.statusCode).equals(200);
            expect(payload.data).to.includes(['type', 'id', 'attributes']);
            expect(payload.links).to.includes('self').and.exists();
        });

        test('return 404 is user is not found', async () => {

            delete headers['content-type'];
            const result = await server.inject({ method: 'GET', url: '/users/123456789a34512345654334', headers });
            expect(result.statusCode).equals(404);
            expect(result.headers['content-type']).equals('application/vnd.api+json');
        });

        test('bad request', async () => {

            delete headers['content-type'];
            const result = await server.inject({ method: 'GET', url: '/users/123456789a3451234565433', headers });
            expect(result.statusCode).equals(400);
        });
    });

    experiment('GET /users', () => {

        test('retun 200 on success', async () => {

            await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });

            delete headers['content-type'];
            const result = await server.inject({ method: 'GET', url: '/users', headers });
            expect(result.statusCode).equals(200);

            const { data, links } = JSON.parse(result.payload);
            expect(data).length(1).and.array().and.not.empty();
            expect(links.self).string().and.exists();
            expect(result.headers['content-type']).equals('application/vnd.api+json');
        });
    });
});
