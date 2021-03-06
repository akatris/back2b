'use strict';


/**
 * @todo:
 *  - Update username and password
 *  - Delete user
 */


const Hoek = require('hoek');
const Boom = require('boom');
const Joi = require('joi');
const Password = require('../lib/password');
const { validatePostHeaders, validateGetHeaders } = require('../lib/validator');


const create = {
    method: 'POST',
    path: '/users',
    handler: async function (request, h) {

        const { database } = request.mongodb;
        const user = request.payload.data.attributes;
        user.createdAt = Date.now();
        user.updatedAt = user.createdAt;

        // Check if username is taken.
        const usernameOwner = await database.collection('users').findOne({ username: user.username });
        Hoek.assert(usernameOwner === null, Boom.conflict('Username is already taken.'));

        // hash password
        const hash = await Password.hash(user.password);
        user.hash = hash;

        const { insertedId } = await database.collection('users').insertOne(user);
        const resourceLocation = `${request.server.info.uri}/users/${insertedId}`;

        const links = { self: resourceLocation };
        const data = { id: insertedId, types: 'users', attributes: { username: user.username }, links };

        return h.response({ data }).type('application/vnd.api+json').created().location(resourceLocation);
    },
    options: {
        cors: true,
        validate: {
            headers: validatePostHeaders,
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

        const { database, ObjectId } = request.mongodb;
        const params = request.params;

        const user = await database.collection('users').findOne(ObjectId(params.id));
        Hoek.assert(user, Boom.notFound('User not found.'));

        const { _id, username, createdAt, updatedAt } = user;
        const data = { id: _id, type: 'users', attributes: { username, createdAt, updatedAt } };
        const links = { self: `${request.server.info.uri}/users/${_id}` };

        return h.response({ data, links })
            .header('content-type', 'application/vnd.api+json');
    },
    options: {
        validate: {
            headers: validateGetHeaders,
            params: Joi.object().keys({
                id: Joi.string().hex().length(24)
            })
        }
    }
};


const list = {
    method: 'GET',
    path: '/users',
    handler: async function (request, h) {

        const { database } = request.mongodb;

        const users = await database.collection('users').find().toArray();
        const data = users.map(({ _id, username, createdAt, updatedAt }) => {

            return { type: 'users', id: _id, attributes: { username, createdAt, updatedAt } };
        });

        const links = { self: `${request.server.info.uri}/users` };

        return h.response({ data, links }).type('application/vnd.api+json');
    }
};


module.exports = [create, detail, list];
