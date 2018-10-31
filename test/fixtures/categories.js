'use strict';

const Faker = require('faker');

const post = (id, authorization) => ({
    method: 'POST', url: '/pcop/categories',
    payload: {
        id, name: Faker.commerce.productAdjective(), description: Faker.lorem.paragraph()
    },
    headers: {
        'content-type': 'application/vnd.api+json',
        accept: 'application/vnd.api+json',
        authorization
    }
});

module.exports = { post };
