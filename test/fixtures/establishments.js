'use strict';


const Faker = require('faker');


const post = (id, authorization) => ({
    method: 'post',
    url: '/establishments',
    headers: {
        'Content-Type': 'application/vnd.api+json',
        accept: 'application/vnd.api+json',
        authorization
    },
    payload: {
        data: {
            type: 'establishments',
            attributes: {
                name: Faker.name.jobArea,
                initialFunds: Faker.random.number,
                user_id: id
            },
            relationships: {
                user: {
                    data: {
                        type: 'user',
                        id
                    }
                }
            }
        }
    }
});


module.exports = { post };
