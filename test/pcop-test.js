'use strict';


const Lab = require('lab');
const Pcop = require('../lib/pcop');
const Server = require('../index');
const { expect } = require('code');

const { beforeEach, experiment, test } = exports.lab = Lab.script();


experiment('Pcop model', () => {


    let pcop = null;
    let server = null;

    beforeEach(async () => {

        server = await Server();
        await server.mongodb.reset();
        pcop = new Pcop();
    });


    test('Pcop class exists', () => {

        expect(Pcop).exists();
        pcop = new Pcop({ id: 1, name: 'pcop name', description: 'pcop description' });
        expect(pcop.getType()).equals('categories');
        pcop = new Pcop({ id: 11, name: 'pcop name', description: 'pcop description' });
        expect(pcop.getType()).equals('accounts');
        pcop = new Pcop({ id: 111, name: 'pcop name', description: 'pcop description' });
        expect(pcop.getType()).equals('subaccounts');
        pcop = new Pcop({ id: 1211, name: 'pcop name', description: 'pcop description' });
        expect(pcop.getType()).equals('rubrics');
        pcop = new Pcop({ id: null, name: 'pcop name', description: 'pcop description' });
        expect(pcop.getType()).equals('unknown');
    });


    test('PCOP create', async () => {

        let result = {};
        pcop = new Pcop({ id: 1, name: 'pcop name', description: 'pcop description' }, server.mongodb.database);
        result = await pcop.create();
        expect(result.ok).equals(1);
        expect(result.type).equals('categories');

        pcop = new Pcop({ id: 11, name: 'pcop name', description: 'pcop description' }, server.mongodb.database);
        result = await pcop.create();
        expect(result.ok).equals(1);
        expect(result.type).equals('accounts');

        pcop = new Pcop({ id: 11111111, name: 'pcop name', description: 'pcop description' }, server.mongodb.database);
        result = await pcop.create();
        expect(result.ok).equals(0);
        expect(result.type).equals('unknown');
    });

    test('Pcop find', async () => {

        let result = {};
        pcop = new Pcop({ id: 1, name: 'pcop name', description: 'pcop description' }, server.mongodb.database);
        await pcop.create();

        result = await pcop.findById(1);
        expect(result.pcop).object();
        expect(result.found).boolean();

        result = await pcop.findById(2);
        expect(result.pcop).null();
        expect(result.found).false();
    });
});
