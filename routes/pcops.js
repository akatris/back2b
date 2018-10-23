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

module.exports = [create];
