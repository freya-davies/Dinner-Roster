
exports.up = function(knex) {
  return knex.schema.createTable('weekList', table => {
    //this needs calendar days in it
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('weekList')
};
