'use strict';

const Boom = require('boom');
const Hoek = require('hoek');
const { verify } = require('./token');

const scheme = (server, options) => {

    return {
        authenticate: async (request, h) => {

            const headers = request.headers;
            Hoek.assert(headers.authorization, Boom.unauthorized('Invalid authorization header.'));

            const authorization = headers.authorization.split(' ');
            Hoek.assert(authorization.length === 2, Boom.unauthorized('Invalid authorization header.'));
            Hoek.assert(authorization[0] === 'Bearer' && authorization[1], Boom.unauthorized('Invalid authorization header.'));

            const { database, ObjectId } = request.mongodb;

            const decoded = await verify(authorization[1]);

            const user = await database.collection('users').findOne({ _id: ObjectId(decoded.id), username: decoded.username });
            Hoek.assert(user, Boom.unauthorized('Invalid username or password'));

            return h.authenticated({ credentials: { id: decoded.id } });

        }
    };
};

module.exports = scheme;
