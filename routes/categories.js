'use strict';

const index = {
    method: 'GET',
    path: '/pcop/categories',
    handler: (request, h) => 'hello'
};

const create = {
    method: 'POST',
    path: '/pcop/categories',
    handler: (request, h) => 'create'
};

module.exports = [index, create];
