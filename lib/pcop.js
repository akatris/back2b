'use strict';


const internals = {};


internals.PCOP_CATEGORY_REGEX = /^\d$/;

internals.PCOP_ACCOUNT_REGEX = /^\d\d$/;

internals.PCOP_SUBACCOUNT_REGEX = /^\d{3}$/;

internals.PCOP_RUBRIC_REGEX = /^\d{4}$/;


internals.pcopTypes = ['categories', 'subaccounts', 'accounts', 'rubrics', 'unknown'];


module.exports = class {

    constructor(db, fields = {}) {

        this.id = fields.id;
        this.name = fields.name;
        this.description = fields.description;
        this.eligibleTransactions = fields.eligibleTransactions;
        this.database = db;
    }

    getType() {

        if (/^\d$/.test(this.id)) {
            return 'categories';
        }

        if (/^\d{2}$/.test(this.id)) {
            return 'accounts';
        }

        if (/^\d{3}$/.test(this.id)) {
            return 'subaccounts';
        }

        if (/^\d{4}$/.test(this.id)) {
            return 'rubrics';
        }

        return 'unknown';
    }

    async create() {

        const type = this.getType();

        if (type === 'unknown') {
            return { ok: 0, type: 'unknown' };
        }

        const createTime = Date.now();
        const { result } = await this.database.collection(type).insertOne({
            _id: this.id,
            name: this.name,
            description: this.description,
            createdAt: createTime,
            updatedAt: createTime
        });

        return { ok: result.ok, type };
    }

    async findById(id) {

        const type = this.getType();
        const found = await this.database.collection(type).findOne({ _id: id });

        if (found) {
            return { pcop: found, found: true };
        }

        return { pcop: null, found: false };
    }
};
