'use strict';

const Lab = require('lab');
const { expect } = require('code');

const Pcop = require('../lib/pcop');
const { init } = require('../index');
const { reset } = require('../bootstrap-test');

const { before, beforeEach, experiment, test } = exports.lab = Lab.script();

experiment('Pcop', () => {

    let category = null;
    let subaccount = null;
    let account = null;
    let rubric = null;
    let unknown = null;

    before(() => {

        category = new Pcop({ _id: 1, name: 'Category', description: 'Description' });
        account = new Pcop({ _id: 11, name: 'Category', description: 'Description' });
        subaccount = new Pcop({ _id: 111, name: 'Category', description: 'Description' });
        rubric = new Pcop({ _id: 1111, name: 'Category', description: 'Description' });
        unknown = new Pcop({ _id: 111111 });
    });

    test('constructor() should sets field', () => {

        expect(category._id).to.be.not.null().and.not.undefined();
        expect(category.name).to.be.not.null().and.not.undefined();
        expect(category.description).to.be.not.null().and.not.undefined();
    });

    test('constructor() should sets type', () => {

        expect(category.type).to.be.equal('category');
        expect(account.type).to.be.equal('account');
        expect(subaccount.type).to.be.equal('subaccount');
        expect(rubric.type).to.be.equal('rubric');
        expect(unknown.type).to.equal('unknown');
    });

    experiment('save()', () => {

        let db = null;

        before(async () => {

            const server = await init();
            db = server.plugins.mongodb.database;
        });

        beforeEach(async () => {

            await reset();
        });

        test('return object on success', async () => {

            const result = await category.save(db);
            expect(result).to.include(['insertedId', 'ok']);
        });

        test('ok equals 0 if it fails', async () => {

            const result = await unknown.save(db);
            expect(result.ok).to.equal(0);
        });
    });
});
