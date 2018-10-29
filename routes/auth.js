'use strict';

const { sign } = require('../lib/token');

const create = {
    method: 'POST',
    path: '/auth/token',
    handler: async (request, h) => {

        const { database } = request.mongodb;
        const payload = request.payload;

        const userExists = await database.collection('users').findOne({ username: payload.data.attributes.username });

        const token = await sign({ username: userExists.username, id: userExists._id });
        const data = { id: token, type: 'token' };

        return h.response({ data }).created().type('application/vnd.api+json');
    }
};

module.exports = [create];
