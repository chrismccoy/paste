exports.up = function(knex) {
  return knex.schema.table("pastes", (table) => {
      table.string("uuid", 100).nullable(); // Added nullable for clarity
      table.string("key", 100).notNullable(); // Ensured key is not nullable
      table.unique("key");
  });
};

exports.down = function(knex) {
  return knex.schema.table("pastes", (table) => {
      table.dropUnique("key"); // Dropping unique constraint
      table.dropColumn("key"); // Dropping the key column
      table.dropColumn("uuid"); // Dropping the uuid column
  });
};
