'use strict';

const createEstablishment = (name, initialFunds, user_id, authorization = null) => ({
    method: 'post',
    url: '/establishments',
    headers: {
        'Content-Type': 'application/vnd.api+json',
        accept: 'application/vnd.api+json',
        authorization
    },
    payload: {
        data: {
            type: 'establishments',
            attributes: { name, initialFunds, user_id },
            relationships: {
                user: {
                    data: {
                        type: 'user',
                        id: user_id
                    }
                }
            }
        }
    }
});

module.exports = { createEstablishment };
