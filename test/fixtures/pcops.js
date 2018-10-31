'use strict';

const Faker = require('faker');
const Pcop = require('../../lib/pcop-type');

const post = (id, token = null) => ({
    method: 'POST', url: '/pcops',
    payload: {
        data: {
            type: Pcop.getType(id),
            attributes: { id, name: Faker.commerce.productAdjective(), description: Faker.lorem.paragraph() }
        }
    },
    headers: {
        'content-type': 'application/vnd.api+json',
        accept: 'application/vnd.api+json',
        authorization: token
    }
});

module.exports = { post };
