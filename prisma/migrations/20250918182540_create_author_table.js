/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) { // For creating table
  //author:id and name
  return knex.schema.createTable("authors", function(table){
    table.string("name").notNullable;
    table.increments("id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("authors");
};
