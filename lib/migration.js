'use strict';

// Apply schema to the database.
// Make connection and close it.
class Migration {
    constructor(database) {

        this.database = database;
    }

    async run(action) {

        try {
            await this.database.connect();
            await action(this.database.get());
            this.database.client.close();
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = Migration;
