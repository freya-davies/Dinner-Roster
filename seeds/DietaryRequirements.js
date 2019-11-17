
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dietaryRequirements').del()
    .then(function () {
      // Inserts seed entries
      return knex('dietaryRequirements').insert([
        {requirement_id: 1, requirement: 'Olives', person_id: '5'},
        {requirement_id: 2, requirement: 'Eggplant', person_id: '5'},
        {requirement_id: 3, requirement: 'Coconut', person_id: '5'},
        {requirement_id: 3, requirement: 'Quinoa', person_id: '1'}
      ]);
    });
};
