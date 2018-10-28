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
    let payload = {};
    let user = {};

    before(async () => {

        server = await init();
    });

    beforeEach(async () => {

        await reset();
        headers = { 'content-type': 'application/vnd.api+json', accept: 'application/vnd.api+json' };

        const createUser = async ({ username, password }) => {

            const result = await server.inject({
                method: 'POST',
                headers,
                payload: {
                    data: {
                        type: 'users',
                        attributes: { username, password }
                    }
                }
            });
            console.log(result.payload);
        }

        postObject = { method: 'POST', url: '/establishments', headers };
        payload = {
            data: {
                type: 'establishments',
                attributes: {
                    name: 'My establishment',
                    initialFunds: 1000,
                    user_id:
                }
            }
        };
    });

    experiment('POST /establishments', () => {

        test('returns 201 success', async () => {

            const result = await server.inject(postObject);
            const payload = JSON.parse(result.payload);
            expect(result.statusCode).equals(201);
            expect(result.headers['content-type']).equals('application/vnd.api+json');
            expect(payload.data).to.includes(['attributes', 'id', 'type']);
        });
    });
});
