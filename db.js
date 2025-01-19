const fs = require("fs").promises;

const knex = require("knex")({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./db/db.sqlite",
  },
});

const createPastesTable = async () => {
  try {
    const exists = await knex.schema.hasTable("pastes");
    if (!exists) {
      await knex.schema.createTable("pastes", (table) => {
        table.increments("id");
        table.string("language");
        table.string("uuid", 100);
        table.string("key", 100).unique();
        table.string("content", 100000).notNullable();
        table.datetime("expires_at").notNullable();
        table.timestamps(false, true);
      });
      console.log("Pastes table created successfully.");
    } else {
      console.log("Pastes table already exists.");
    }
  } catch (error) {
    console.error("Error creating pastes table:", error);
  } finally {
    await knex.destroy();
  }
};

const checkDatabaseExists = async () => {
  try {
    await fs.access('./db/db.sqlite');
    console.log('Paste Database exists.');
    await createPastesTable();
  } catch (error) {
    console.log('Paste Database does not exist, creating it now.');
    await createPastesTable();
  }
};

checkDatabaseExists();
