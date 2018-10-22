async function up(db) {
  await db.createCollection('categories');
}

module.exports = {up};
