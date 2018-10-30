'use strict';


/**
 * @todo:
 *  - Update admin
 *  - Change username
 *  - Add user to establishment
 *  - Update funds
 */


const create = {
    method: 'POST',
    path: '/establishments',
    handler: async function (request, h) {

        const { database } = request.mongodb;
        const payload = request.payload;
        const { insertedId } = await database.collection('establishments').insertOne({
            name: payload.data.attributes.name,
            funds: payload.data.attributes.initialFounds,
            user_id: payload.data.relationships.user.data.id
        });
        const location = `${request.server.info.uri}/establishments/${insertedId}`;

        const data = {
            id: insertedId,
            attributes: {
                name: payload.data.attributes.name,
                funds: payload.data.attributes.initialFunds,
                user_id: payload.data.relationships.user.data.id
            },
            type: 'establishments',
            links: {
                self: `${request.server.info.uri}/establishments/${insertedId}`
            }
        };

        return h.response({ data }).code(201).type('application/vnd.api+json')
            .location(location);
    },
    options: {
        auth: {
            strategy: 'token'
        }
    }
};


module.exports = [create];
