'use strict';

const Bcrypt = require('bcryptjs');

const hash = async function (password) {

    const salt = await Bcrypt.genSalt(10);
    const password_hash = await Bcrypt.hash(password, salt);
    return password_hash;
};

module.exports = { hash };
