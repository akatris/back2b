'use strict';

const create = {
    method: 'POST',
    path: '/establishments',
    handler: async function (request, h) {

        const db = request.server.plugins.mongodb.database;
        const payload = request.payload;
        console.log(payload)
        const { insertedId } = await db.collection('establishments').insertOne({
            name: payload.data.attributes.name,
            funds: payload.data.attributes.initialFounds,
            user_id: payload.data.relationships.user.id
        });

        const data = {
            id: insertedId,
            attributes: {
                name: payload.data.attributes.name,
                funds: payload.data.attributes.initialFounds,
                user_id: payload.data.relationships.user.id
            },
            types: 'establishments'
        }

        console.log(data)
        return h.response({ data }).code(201).type('application/vnd.api+json');
    },
};

module.exports = [create];
