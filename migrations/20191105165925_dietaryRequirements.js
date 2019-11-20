
exports.up = function(knex) {
  return knex.schema.createTable('dietaryRequirements', table => {
    table.increments('requirement_id')
    table.string('requirement')
    table.string('person_id')
    table.string('searchItem')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('dietaryRequirements')
};
