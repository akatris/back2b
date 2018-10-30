'use strict';


const post = (username, password) => ({
    method: 'post',
    url: '/auth/token',
    headers: {
        'content-type': 'application/vnd.api+json',
        accept: 'application/vnd.api+json'
    },
    payload: {
        data: {
            attributes: { username, password }
        }
    }
});

module.exports = { post };
