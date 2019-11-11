const knex = require('knex')
const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const connection = require('knex')(config)
const db = knex(config[env])


db('profiles').select().then(data => {
    console.log('Is this bring back data?', data)
})

function getUser(id, db = database) {
    return db('profile').where('user_id', id).select()
}

//functions go in here


module.exports = {
    
}

