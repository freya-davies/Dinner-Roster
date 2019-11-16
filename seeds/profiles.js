
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries 
      return knex('profiles').insert([
        {user_id: 1, name: 'Sarrah', user_image: 'freya.JPG', daysRostered: 'Wednesday', daysAway: 'null'}, 
        {user_id: 2, name: 'Nick', user_image: '#', daysRostered: 'Tuesday', daysAway: 'null'}, 
        {user_id: 3, name: 'Rosa', user_image: '#', daysRostered: 'Thursday', daysAway: 'null'}, 
        {user_id: 4, name: 'Sam', user_image: '#', daysRostered: 'Monday', daysAway: 'Thursday the 17th'}, 
        {user_id: 5, name: 'Freya', user_image: '#', daysRostered: 'Sunday', daysAway: 'null'}
      ]);
    });
};
