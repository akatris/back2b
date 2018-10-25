'use strict';

const Hoek = require('hoek');
const Boom = require('boom');
const Joi = require('joi');
const Password = require('../lib/password');

const create = {
    method: 'POST',
    path: '/users',
    handler: async function (request, h) {

        const db = request.server.plugins.mongodb.database;

        const user = request.payload.data.attributes;
        user.createdAt = Date.now();
        user.updatedAt = user.createdAt;

        // Check if username is taken.
        const usernameOwner = await db.collection('users').findOne({ username: user.username });
        Hoek.assert(usernameOwner === null, Boom.conflict('Username is already taken.'));

        // hash password
        const hash = await Password.hash(user.password);
        user.hash = hash;

        const { insertedId } = await db.collection('users').insertOne(user);
        const resourceLocation = `${request.server.info.uri}/users/${insertedId}`;

        const links = { self: resourceLocation };
        const data = { id: insertedId, types: 'users', attributes: { username: user.username }, links };

        return h.response({ data }).type('application/vnd.api+json').created().location(resourceLocation);
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

const detail = {
    method: 'GET',
    path: '/users/{id}',
    handler: async function (request, h) {

        const db = request.server.methods.getDatabase();
        const ObjectId = request.server.plugins.mongodb.ObjectId;
        const params = request.params;

        const user = await db.collection('users').findOne(ObjectId(params.id));
        const { _id, username, createdAt, updatedAt } = user;
        const data = { id: _id, type: 'users', attributes: { username, createdAt, updatedAt } };
        return h.response({ data })
            .header('content-type', 'application/vnd.api+json');
    },
    options: {
        validate: {
            headers: function (value, options) {

                Hoek.assert(value.accept === 'application/vnd.api+json', Boom.notAcceptable());
            }
        }
    }
};

module.exports = [create, detail];
