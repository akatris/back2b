'use strict';

const create = {
    method: 'POST',
    path: '/establishments',
    handler: function (request, h) {

        return h.response().code(201).type('application/vnd.api+json');
    }
};

module.exports = [create];
