// Copyright (c) 2018 Sitraka Ratsimba
'use strict';

const Lab = require('lab');
const Server = require('../index');
const { expect } = require('code');

const { experiment, test } = exports.lab = Lab.script();

experiment('MongoDB plugin', () => {

    test('decorate server and request with mongodb object', async () => {

        const server = await Server();
        const { database, ObjectId, reset, client } = server.mongodb;
        expect(database).exists();
        expect(ObjectId).exists();
        expect(reset).function();
        expect(client).exists();
    });
});
