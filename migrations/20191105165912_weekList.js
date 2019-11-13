
exports.up = function(knex) {
  return knex.schema.createTable('weekList', table => {
    table.string('calendar_id').primary()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('weekList')
};
