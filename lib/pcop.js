'use strict';

const Pluralize = require('pluralize');

const internals = {};

internals.types = ['category', 'account', 'subaccount', 'rubric'];

internals.getType = function (id) {

    const length = String(id).length;
    return internals.types[length - 1] || 'unknown';
};

module.exports = class Pcop {
    constructor(attributes) {

        this._id = attributes._id;
        this.name = attributes.name;
        this.description = attributes.description;
        this.type = internals.getType(attributes._id);
    }

    async save(database) {

        const collectionName = Pluralize.plural(this.type);

        if (this.type === 'unknown') {
            return { ok: 0 };
        }

        const { insertedId, result } = await database.collection(collectionName).insertOne({
            _id: this.id,
            name: this.name,
            description: this.description
        });
        return { insertedId, ok: result.ok };
    }
};
