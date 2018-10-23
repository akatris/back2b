'use strict';

const Lab = require('lab');
const { expect } = require('code');
const { init } = require('../index');

const { before, beforeEach, describe, it } = exports.lab = Lab.script();

describe('pcops', () => {

    let server = null;
    let rubric = {};

    before(async () => {

        server = await init();
    });

    beforeEach(() => {

        rubric = {
            id: 1,
            name: 'Category 1',
            description: 'Category description 1',
            eligible_transactions: []
        };
    });

    describe('POST /pcops', () => {

        const makeRequest = async (payload) => {

            const result = await server.inject({
                method: 'POST',
                url: '/pcops',
                payload
            });
            return result;
        };

        it('should exists', async () => {

            const result = await makeRequest(rubric);
            expect(result.statusCode).equal(200);
        });

        it('should return when params are invalid', async () => {


            let result = await makeRequest(rubric);
            expect(result.statusCode).equal(200);

            rubric.id = null;
            result = await makeRequest(rubric);
            expect(result.statusCode).equal(400);
        });

        it('should save pcop based on id', async () => {

            const result = await makeRequest(rubric);
            const payload = JSON.parse(result.payload);
            expect(result.statusCode).equal(200);
            expect(payload.insertedId).not.null();
            expect(payload.result.ok).equal(1);
        });
    });
});
