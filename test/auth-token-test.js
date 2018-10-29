'use strict';

const Lab = require('lab');
const { expect } = require('code');

const { init } = require('../index');
const { reset } = require('../bootstrap-test');
const { sign } = require('../lib/token');
const { createEstablishment } = require('./_fixture/establishments');

const { before, beforeEach, experiment, test } = (exports.lab = Lab.script());
experiment('/auth/token', () => {

    let server = null;
    const user = {
        username: 'useraka',
        password: 'password'
    };
    let validToken = '';

    before(async () => {

        server = await init();
    });

    beforeEach(async () => {

        await reset();
        const result = await server.inject({
            method: 'POST',
            url: '/users',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                accept: 'application/vnd.api+json'
            },
            payload: {
                data: {
                    type: 'users',
                    attributes: {
                        username: user.username,
                        password: user.password
                    }
                }
            }
        });
        const userId = JSON.parse(result.payload).data.id;
        user.id = userId;
        validToken = await sign({ username: user.username, id: userId });
    });

    experiment('POST /auth/token', () => {

        test('Return 201 on succes', async () => {

            const result = await server.inject({
                method: 'post',
                url: '/auth/token',
                headers: {
                    'content-type': 'application/vnd.api+json',
                    accept: 'application/vnd.api+json'
                },
                payload: {
                    data: {
                        type: 'token',
                        attributes: {
                            username: user.username,
                            password: user.password
                        }
                    }
                }
            });

            expect(result.statusCode).equals(201);
            expect(result.headers['content-type']).equals('application/vnd.api+json');
            const payload = JSON.parse(result.payload);
            expect(payload.data.type).equals('token');
            expect(payload.data.id).to.be.a.string();
        });
    });

    experiment('Token authentication', () => {

        test('try to access protected route with a token', async () => {

            const authorization = `Bearer ${validToken}`;
            const result = await server.inject(createEstablishment(user.username, 100000, user.id, authorization));
            expect(result.statusCode).equals(201);
            expect(result.request.auth.credentials.id).equals(user.id);
            expect(result.headers['content-type']).equals('application/vnd.api+json');
        });

        test('Should throw invalid when invalid token', async () => {

            let authorization = `${validToken}`;
            let result = await server.inject(createEstablishment(user.username, 100000, user.id, authorization));
            expect(result.statusCode).equals(401);
            expect(result.headers['content-type']).equals('application/vnd.api+json');

            authorization = `bearer ${validToken}`;
            result = await server.inject(createEstablishment(user.username, 100000, user.id, authorization));
            expect(result.statusCode).equals(401);
            expect(result.headers['content-type']).equals('application/vnd.api+json');

            const token = await sign({ username: 'hello', id: user.id });
            authorization = `Bearer ${token}`;

            result = await server.inject(createEstablishment(user.username, 100000, user.id, authorization));
            expect(result.statusCode).equals(401);
            expect(result.headers['content-type']).equals('application/vnd.api+json');
        });
    });
});
