
exports.up = function(knex) {
  return knex.schema.createTable('profiles', table => {
    table.increments('user_id').primary()
    table.string('name')
    table.string('user_image')
    table.string('daysRostered')
    table.string('daysAway')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('profiles')
};
