'use strict';


const Faker = require('faker');


const users = {};


users.post = () => ({
    method: 'post',
    url: '/users',
    headers: {
        'content-type': 'application/vnd.api+json',
        accept: 'application/vnd.api+json'
    },
    payload: {
        data: {
            type: 'users',
            attributes: {
                username: Faker.internet.userName(),
                password: Faker.internet.password()
            }
        }
    }
});


users.get = (id) => ({
    method: 'get',
    url: `/users/${id}`,
    headers: {
        accept: 'application/vnd.api+json'
    }
});


users.all = () => ({
    method: 'get',
    url: '/users',
    headers: {
        accept: 'application/vnd.api+json'
    }
});


module.exports = { users };
