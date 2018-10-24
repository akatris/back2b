'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Pcop = require('../lib/pcop');

const create = {
    method: 'POST',
    path: '/pcops',
    handler: async (request, h) => {

        const { id, name, description } = request.payload;
        const pcop = new Pcop({ id, name, description });
        const db = request.server.plugins.mongodb.database;

        const exists = await Pcop.findById(db, id);
        if (exists) {
            return Boom.conflict('This id is already taken');
        }

        const result = await pcop.save(db);
        return result;
    },
    options: {
        cors: true,
        validate: {
            payload: Joi.object().keys({
                id: Joi.number().integer().min(1).max(9000).required(),
                name: Joi.string().min(1).max(255).required(),
                description: Joi.string().max(500)
            })
        }
    }
};

const index = {
    method: 'GET',
    path: '/pcops',
    handler: async function (request, h) {

        const db = request.server.plugins.mongodb.database;
        const pcops = await Pcop.all(db);
        return pcops;
    }
};

module.exports = [create, index];
