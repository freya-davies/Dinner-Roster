
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries 
      return knex('profiles').insert([
        {user_id: 1, name: 'Sarrah', user_image: '', day_rostered: '', day_away: ''}, 
        {user_id: 2, name: 'Nick', user_image: '', day_rostered: '', day_away: ''}, 
        {user_id: 3, name: 'Rosa', user_image: '', day_rostered: '', day_away: ''}, 
        {user_id: 3, name: 'Sam', user_image: '', day_rostered: '', day_away: ''}, 
        {user_id: 3, name: 'Freya', user_image: '', day_rostered: '', day_away: ''}
      ]);
    });
};
