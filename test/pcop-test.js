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

    let db = null;
    let server = null;

    beforeEach(async () => {

        await reset();
    });

    before(async () => {

        server = await init();
        db = server.plugins.mongodb.database;

        category = new Pcop({ id: 9, name: 'Category', description: 'Description' });
        account = new Pcop({ id: 99, name: 'Category', description: 'Description' });
        subaccount = new Pcop({ id: 999, name: 'Category', description: 'Description' });
        rubric = new Pcop({ id: 9999, name: 'Category', description: 'Description' });
        unknown = new Pcop({ id: 111111 });
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

        test('return object on success', async () => {

            const result = await category.save(db);
            expect(result).to.include(['insertedId', 'ok']);
        });

        test('ok equals 0 if it fails', async () => {

            const result = await unknown.save(db);
            expect(result.ok).to.equal(0);
        });
    });

    experiment('all()', () => {

        test('return an object', async () => {

            await category.save(db);
            await account.save(db);
            await subaccount.save(db);
            await rubric.save(db);
            const result = await Pcop.all(db);
            expect(result.data).to.includes(['categories', 'accounts', 'subaccounts', 'rubrics']);
            expect(result.data.categories).to.be.an.array().and.not.empty();
            expect(result.data.accounts).to.be.an.array().and.not.empty();
            expect(result.data.subaccounts).to.be.an.array().and.not.empty();
            expect(result.data.rubrics).to.be.an.array().and.not.empty();
        });
    });

    experiment('find()', () => {

        test('return an object if found', async () => {

            await category.save(db);
            const result = await Pcop.findById(db, category._id);
            expect(result).to.includes(['_id', 'name', 'description']);
        });

        test('return null when pcop is not find', async () => {

            const result = await Pcop.findById(db, unknown._id);
            expect(result).to.be.null();
        });
    });
});
