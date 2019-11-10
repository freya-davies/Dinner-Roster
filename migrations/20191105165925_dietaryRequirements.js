
exports.up = function(knex) {
  return knex.schema.createTable('dietaryRequirements', table => {
    table.string('requirement_id')
    table.string('requirement')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('dietaryRequirements')
};
