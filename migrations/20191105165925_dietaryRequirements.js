
exports.up = function(knex) {
  return knex.schema.createTable('dietaryRequirements', table => {
    table.string('requirements')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('dietaryRequirements')
};
