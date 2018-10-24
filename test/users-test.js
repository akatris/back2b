'use strict';

const Lab = require('lab');
const { expect } = require('code');

const { init } = require('../index');
const { reset } = require('../bootstrap-test');

const { before, beforeEach, experiment, test } = exports.lab = Lab.script();

experiment('users', () => {

    let server = null;
    let requestPayload = null;
    let headers = {};
    before(async () => {

        server = await init();
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

        await reset();
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

            console.log(result.headers);
            expect(result.headers['content-type']).to.equals('application/vnd.api+json');
        });

        test('return 201 on success', async () => {

            const result = await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });
            const payload = JSON.parse(result.payload);
            expect(result.statusCode).equals(201);
            expect(payload.data).to.includes(['id', 'types', 'attributes', 'links']);
            expect(result.headers.location).to.be.a.string();
            console.log(result.headers);
        });

        test('return 409 if username is already taken', async () => {

            await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });
            const result = await server.inject({ method: 'POST', url: '/users', headers, payload: requestPayload });
            expect(result.statusCode).equals(409);
        });
    });
});
