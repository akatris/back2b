'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Hoek = require('hoek');

const create = {
    method: 'POST',
    path: '/pcop/categories',
    handler: async function (request, h) {

        const db = request.server.plugins.mongodb.database;
        const { id, name, description } = request.payload;

        const exists = await db.collection('categories').findOne({
            $or: [{ _id: id }, { name }]
        });

        if (exists) {
            Hoek.assert(exists._id !== id, Boom.conflict('Category id is already taken.'));
            Hoek.assert(exists.name !== name, Boom.conflict('Category name is already taken.'));
        }

        const { insertedId } = await db.collection('categories').insertOne({ _id: id, name, description });
        const data = { type: 'categories', attributes: { id: insertedId, name, description } };
        return h.response({ data }).code(201).message('Created').header('Content-Type', 'application/vnd.api+json');
    },
    options: {
        cors: true,
        validate: {
            payload: Joi.object().keys({
                id: Joi.number().integer().min(1).max(9).required(),
                name: Joi.string().required(),
                description: Joi.string()
            })
        }
    }
};


const detail = {
    method: 'GET',
    path: '/pcop/categories/{id}',
    handler: async function (request, h) {

        const db = request.server.plugins.mongodb.database;
        const params = request.params;

        const category = await db.collection('categories').findOne({ _id: params.id });

        Hoek.assert(category !== null, Boom.notFound('Category with id 1 was not found.'));

        const { _id, name, description } = category;
        const data = { type: 'categories', attributes: { id: _id, name, description } };
        return h.response({ data }).header('Content-type', 'application/vdn.api+json');
    },
    options: {
        cors: true,
        validate: {
            params: Joi.object().keys({
                id: Joi.number().integer().min(1).max(9).required()
            })
        }
    }
};

const all = {
    method: 'GET',
    path: '/pcop/categories',
    handler: async function (request, h) {

        const db = request.server.plugins.mongodb.database;
        const data = await db.collection('categories').find().toArray();
        return h.response({ data }).header('Content-Type', 'application/vnd.api+json');
    }
};

module.exports = [create, detail, all];
