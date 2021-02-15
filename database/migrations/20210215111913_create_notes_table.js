exports.up = function (knex) {
  return knex.schema.createTable("notetable", function (table) {
    table.increments().index();
    table.string("note").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notetable");
};
