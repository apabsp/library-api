/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) { // For creating table
  //name genre author year
  return knex.schema.createTable("books", function(table){
    table.string("title").notNullable();
    table.increments("id").primary();
    table.string("genre");
    table.date("year");
    table.integer("author_id").unsigned().references("id").inTable("authors");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) { // for dropping
  return knex.schema.dropTable("books");
};
