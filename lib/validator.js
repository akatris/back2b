'use strict';

const Hoek = require('hoek');
const Boom = require('boom');

const validatePostHeaders = function (value, options) {

    Hoek.assert(value['content-type'] === 'application/vnd.api+json', Boom.unsupportedMediaType());
    Hoek.assert(value.accept === 'application/vnd.api+json', Boom.notAcceptable());
};

const validateGetHeaders = function (value, options) {

    Hoek.assert(value.accept === 'application/vnd.api+json', Boom.notAcceptable());
};

module.exports = { validatePostHeaders, validateGetHeaders };
