
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries 
      return knex('profiles').insert([
        {user_id: 1, name: 'Sarrah', user_image: 'greyhound1.jpg', daysRostered: 'Wednesday', daysAway: 'null'}, 
        {user_id: 2, name: 'Nick', user_image: 'greyhounds.jpeg', daysRostered: 'Tuesday', daysAway: 'null'}, 
        {user_id: 3, name: 'Rosa', user_image: 'greyhound3.jpg', daysRostered: 'Thursday', daysAway: 'null'}, 
        {user_id: 4, name: 'Sam', user_image: 'greyhound2.jpeg', daysRostered: 'Monday', daysAway: 'Thursday the 17th'}, 
        {user_id: 5, name: 'Freya', user_image: 'greyhound4.jpg', daysRostered: 'Sunday', daysAway: 'null'}
      ]);
    });
};
