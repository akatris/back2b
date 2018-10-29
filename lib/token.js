'use strict';

const Util = require('util');
const JWT = require('jsonwebtoken');

const sign = async ({ username, id }) => {

    const _sign = Util.promisify(JWT.sign);
    const token = await _sign({ username, id }, 'secret');
    return token;
};

const verify = async (token) => {

    const _verify = Util.promisify(JWT.verify);
    const decoded = await _verify(token, 'secret');
    return decoded;
};

module.exports = { verify, sign };
