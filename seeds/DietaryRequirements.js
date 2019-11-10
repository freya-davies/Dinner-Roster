
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dietaryRequirements').del()
    .then(function () {
      // Inserts seed entries
      return knex('dietaryRequirements').insert([
        {requirement_id: 1, requirement: 'Olives'},
        {requirement_id: 2, requirement: 'Eggplant'},
        {requirement_id: 3, requirement: 'Coconut'}
      ]);
    });
};
