'use strict';


const internals = {};


internals.PCOP_CATEGORY_REGEX = /^\d$/;

internals.PCOP_ACCOUNT_REGEX = /^\d\d$/;

internals.PCOP_SUBACCOUNT_REGEX = /^\d{3}$/;

internals.PCOP_RUBRIC_REGEX = /^\d{4}$/;


internals.pcopTypes = ['categories', 'subaccounts', 'accounts', 'rubrics', 'unknown'];


module.exports = class {

    constructor(fields = {}, db) {

        this.id = fields.id;
        this.name = fields.name;
        this.description = fields.description;
        this.eligibleTransactions = fields.eligibleTransactions;
        this.database = db;
    }

    getType() {

        if (internals.PCOP_CATEGORY_REGEX.test(this.id)) {
            return 'categories';
        }

        if (internals.PCOP_ACCOUNT_REGEX.test(this.id)) {
            return 'accounts';
        }

        if (internals.PCOP_SUBACCOUNT_REGEX.test(this.id)) {
            return 'subaccounts';
        }

        if (internals.PCOP_RUBRIC_REGEX.test(this.id)) {
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
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: createTime,
            updatedAt: createTime
        });

        return { ok: result.ok, type };
    }
};
