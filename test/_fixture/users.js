'use strict';

const createUser = (username, password) => ({
    method: 'post',
    url: '/users',
    headers: {
        'Content-Type': 'application/vnd.api+json',
        accept: 'application/vnd.api+json'
    },
    payload: {
        data: {
            type: 'users',
            attributes: { username, password }
        }
    }
});

module.exports = { createUser };
