'use strict';

const Joi = require('joi');

const create = {
    method: 'POST',
    path: '/pcops',
    handler: async (request, h) => {

        const {
            id, name, description,
            eligible_transactions
        } = request.payload;
        const db = request.server.plugins.mongodb.db;
        const {
            insertedId,
            result } = await db.collection('categories').insertOne({
            id,
            name,
            description,
            eligible_transactions
        });
        return { insertedId, result };
    },
    options: {
        validate: {
            payload: Joi.object().keys({
                id: Joi.number().required(),
                name: Joi.string(),
                description: Joi.string(),
                eligible_transactions: Joi.array()
            })
        }
    }
};

module.exports = [create];
