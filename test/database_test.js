'use strict';

const Lab = require('lab');
const { expect } = require('code');
const { connect } = require('../index');

const { describe, it } = exports.lab = Lab.script();

describe('Database', () => {

    it('Should connect', async () => {

        const database = await connect((db) => {});
        expect(database).not.null();
    });
});
