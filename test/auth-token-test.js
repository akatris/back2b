'use strict';


const EstablishmentFixtures = require('./fixtures/establishments');
const Lab = require('lab');
const Server = require('../index');
const UserFixtures = require('./fixtures/users');


const { expect } = require('code');
const { sign } = require('../lib/token');


const { before, beforeEach, experiment, test } = (exports.lab = Lab.script());


experiment('/auth/token', () => {


    let server = null;

    let userId = null;
    let validToken = '';

    let POST_USER_CONFIG = {};
    let POST_ESTABLISHMENT_CONFIG = {};


    before(async () => {

        server = await Server();
    });


    beforeEach(async () => {

        await server.mongodb.reset();

        POST_USER_CONFIG = UserFixtures.post();
        const result = await server.inject(POST_USER_CONFIG);
        userId = JSON.parse(result.payload).data.id;

        validToken = await sign({ username: POST_USER_CONFIG.payload.data.attributes.username, id: userId });

        POST_ESTABLISHMENT_CONFIG = EstablishmentFixtures.post(userId, `Bearer ${validToken}`);
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
                            username: POST_USER_CONFIG.payload.data.attributes.username,
                            password: POST_USER_CONFIG.payload.data.attributes.password
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

            const result = await server.inject(POST_ESTABLISHMENT_CONFIG);
            expect(result.statusCode).equals(201);
            expect(result.request.auth.credentials.id).equals(userId);
            expect(result.headers['content-type']).equals('application/vnd.api+json');
        });


        test('Should throw invalid when invalid token', async () => {

            POST_ESTABLISHMENT_CONFIG.headers.authorization = `${validToken}`;
            let result = await server.inject(POST_ESTABLISHMENT_CONFIG);
            expect(result.statusCode).equals(401);
            expect(result.headers['content-type']).equals('application/vnd.api+json');

            POST_ESTABLISHMENT_CONFIG.headers.authorization = `bearer ${validToken}`;
            result = await server.inject(POST_ESTABLISHMENT_CONFIG);
            expect(result.statusCode).equals(401);
            expect(result.headers['content-type']).equals('application/vnd.api+json');

            const token = await sign({ username: 'hello', id: userId });
            POST_ESTABLISHMENT_CONFIG.headers.authorization = `Bearer ${token}`;

            result = await server.inject(POST_ESTABLISHMENT_CONFIG);
            expect(result.statusCode).equals(401);
            expect(result.headers['content-type']).equals('application/vnd.api+json');

            // not authorized when any authorization header is set
            delete POST_ESTABLISHMENT_CONFIG.headers.authorization;
            result = await server.inject(POST_ESTABLISHMENT_CONFIG);
            expect(result.statusCode).equals(401);
        });
    });
});
