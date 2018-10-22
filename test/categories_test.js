'use strict';

const Lab = require('lab');
const { init } = require('../index');
const { expect } = require('code');

const { before, describe, it } = exports.lab = Lab.script();

describe('/pcops/categories', () => {

    let server = null;

    before(async () => {

        server = await init();
    });

    it('should be OK', async () => {

        const result = await server.inject('/pcop/categories');
        expect(result.statusCode).equal(200);
    });

    describe('POST /pcop/categories', () => {

        it('should exists', async () => {

            const result = await server.inject({
                method: 'POST',
                url: '/pcop/categories'
            });
            expect(result.statusCode).equal(200);
        });
    });
});
