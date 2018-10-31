'use strict';


const Pcop = require('../lib/pcop-type');
const Boom = require('boom');
const Hoek = require('hoek');


const create = {
    method: 'post',
    path: '/pcops',
    handler: async (request, h) => {

        const payload = request.payload;
        const { database } = request.mongodb;
        const type = Pcop.getType(payload.data.attributes.id);

        Hoek.assert(type !== 'unknown', Boom.notFound('This is an unknown type.'));

        // Checks if categories exists.
        const parentId = Pcop.getParentId(payload.data.attributes.id);
        const parentExists = await database.collection(Pcop.getType(parentId)).findOne({ _id: Number(parentId) });
        Hoek.assert(parentExists !== null, Boom.notFound(`Category with ${parentId} does not exists.`));

        const createTime = Date.now();
        const { result } = await database.collection(type).insertOne({
            _id: payload.data.attributes.id,
            name: payload.data.attributes.name,
            description: payload.data.attributes.description,
            createdAt: createTime,
            updatedAt: createTime
        });

        Hoek.assert(result.ok === 1, Boom.badImplementation('Could not save pcop.'));

        const data = {
            id: payload.data.attributes.id,
            type,
            attributes: {
                name: payload.data.attributes.name,
                description: payload.data.attributes.description,
                createdAt: createTime,
                updatedAt: createTime
            }
        };

        return h.response({ data }).created();
    },
    options: {
        auth: {
            strategy: 'token'
        }
    }
};

module.exports = [create];
