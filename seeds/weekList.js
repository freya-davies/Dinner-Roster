
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('weekList').del()
    .then(function () {
      // Inserts seed entries
      return knex('weekList').insert([
        {calendar_id: 1}
      ]);
    });
};
