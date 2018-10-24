'use strict';

const Pluralize = require('pluralize');

const internals = {};

internals.types = ['category', 'account', 'subaccount', 'rubric'];

internals.getType = function (id) {

    const length = String(id).length;
    return internals.types[length - 1] || 'unknown';
};

internals.getCollectionName = function (type) {

    const collectionName = Pluralize.plural(type);
    return collectionName;
};

module.exports = class Pcop {
    constructor(attributes) {

        this._id = attributes.id;
        this.name = attributes.name;
        this.description = attributes.description;
        this.type = internals.getType(attributes.id);
    }


    async save(database) {

        if (this.type === 'unknown') {
            return { ok: 0 };
        }

        const collectionName = internals.getCollectionName(this.type);

        const { insertedId, result } = await database.collection(collectionName).insertOne({
            _id: this._id,
            name: this.name,
            description: this.description
        });

        return { insertedId, ok: result.ok };
    }


    static async all(database) {

        const categories = await database.collection('categories').find().toArray();
        const accounts = await database.collection('accounts').find().toArray();
        const subaccounts = await database.collection('subaccounts').find().toArray();
        const rubrics = await database.collection('rubrics').find().toArray();
        return { data: { categories, accounts, subaccounts, rubrics } };
    }

    static async findById(database, id) {

        const type = internals.getType(id);

        if (type === 'unknown') {
            return null;
        }

        const collectionName = internals.getCollectionName(type);
        const result = await database.collection(collectionName).findOne({ _id: id });
        return result;
    }
};
