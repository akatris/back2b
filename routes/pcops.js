'use strict';

const Joi = require('joi');
const Pcop = require('../lib/pcop');

const create = {
    method: 'POST',
    path: '/pcops',
    handler: async (request, h) => {

        const { id, name, description } = request.payload;
        const pcop = new Pcop({ id, name, description });
        const db = request.server.plugins.mongodb.database;
        const result = await pcop.save(db);
        return result;
    },
    options: {
        validate: {
            payload: Joi.object().keys({
                id: Joi.number().required(),
                name: Joi.string(),
                description: Joi.string()
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
