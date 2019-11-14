
exports.up = function(knex) {
  return knex.schema.createTable('dietaryRequirements', table => {
    table.string('requirement_id')
    table.string('requirement')
    table.string('person_id')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('dietaryRequirements')
};
