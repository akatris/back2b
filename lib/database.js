'use strict';

const { MongoClient } = require('mongodb');

class Database {
    constructor(url, dbName) {

        this.url = url;
        this.dbName = dbName;
        this.client = null;
    }

    async connect() {

        this.client = new MongoClient(this.url, { useNewUrlParser: true });
        try {
            await this.client.connect();
            return this.client.db(this.dbName);
        }
        catch (error) {
            throw error;
        }
    }

    get() {

        return this.client.db(this.dbName);
    }
}

module.exports = Database;
