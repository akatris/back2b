'use strict';


const Faker = require('faker');


const post = () => ({
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


const get = (id) => ({
    method: 'get',
    url: `/users/${id}`,
    headers: {
        accept: 'application/vnd.api+json'
    }
});


const all = () => ({
    method: 'get',
    url: '/users',
    headers: {
        accept: 'application/vnd.api+json'
    }
});


module.exports = { post, get, all };
