'use strict';

const Hoek = require('hoek');
const Boom = require('boom');
const Joi = require('joi');

const create = {
    method: 'POST',
    path: '/users',
    handler: async function (request, h) {

        const db = request.server.methods.getDatabase();

        const user = request.payload.data.attributes;
        user.createdAt = Date.now();
        user.updatedAt = undefined;

        // Check if username is taken.
        const usernameOwner = await db.collection('users').findOne({ username: user.username });
        Hoek.assert(usernameOwner === null, Boom.conflict('Username is already taken.'));

        const { insertedId } = await db.collection('users').insertOne(user);
        const resourceLocation = `${request.server.info.uri}/users/${insertedId}`;

        const links = { self: resourceLocation };
        const data = { id: insertedId, types: 'users', attributes: { username: user.username }, links };

        return h.response({ data })
            .header('content-type', 'application/vnd.api+json')
            .code(201)
            .location(resourceLocation);
    },
    options: {
        validate: {
            headers: function (value, options) {

                Hoek.assert(value['content-type'] === 'application/vnd.api+json', Boom.unsupportedMediaType());
                Hoek.assert(value.accept === 'application/vnd.api+json', Boom.notAcceptable());
            },
            payload: Joi.object().keys({
                data: Joi.object().keys({
                    type: Joi.string().only('users'),
                    attributes: Joi.object().keys({
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    })
                })
            })
        }
    }
};

module.exports = [create];
