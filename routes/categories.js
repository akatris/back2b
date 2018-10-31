'use strict';


const Joi = require('joi');
const Boom = require('boom');
const Hoek = require('hoek');


const internals = {};


internals.checkUnicity = async function (db, category) {

    const exists = await db.collection('categories').findOne({
        $or: [{ _id: category.id }, { name: category.name }]
    });

    if (exists) {
        Hoek.assert(exists._id !== category.id, Boom.conflict('Category id is already taken.'));
        Hoek.assert(exists.name !== category.name, Boom.conflict('Category name is already taken.'));
    }
};


const create = {
    method: 'POST',
    path: '/pcop/categories',
    handler: async function (request, h) {

        const { database } = request.mongodb;
        const { id, name, description } = request.payload;

        await internals.checkUnicity(database, { id, name, description });

        const { insertedId } = await database.collection('categories').insertOne({ _id: id, name, description });
        const data = { type: 'categories', attributes: { id: insertedId, name, description } };
        return h.response({ data }).type('application/vnd.api+json').code(201).message('Created');
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

        const { database } = request.mongodb;
        const params = request.params;

        const category = await database.collection('categories').findOne({ _id: params.id });

        Hoek.assert(category !== null, Boom.notFound('Category with id 1 was not found.'));

        const { _id, name, description } = category;
        const data = { type: 'categories', attributes: { id: _id, name, description } };
        return h.response({ data }).type('application/vnd.api+json');
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

        const { database } = request.mongodb;
        const data = await database.collection('categories').find().toArray();
        return h.response({ data }).type('application/vnd.api+json');
    },
    options: {
        cors: true
    }
};


module.exports = [create, detail, all];
