const knex = require('knex')
const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const database = knex(config)


// db('profiles').select().then(data => {
//     // console.log('Is this bring back data?', data)
// })

function joinProfileAndDR (id, db = database) {
    return db ('dietaryRequirements')
    .join('profiles', 'dietaryRequirements.person_id', 'profiles.user_id')
    .select('*')
    // .then(x => {
    //     console.log(x) 
    //    //call the function below with x as argument
    //     // then run  node db.js on terminal
    // })
}


function getDBAndProfile (id, db = database) {
    return db ('profiles')
    .join('dietaryRequirements', 'profiles.user_id', 'dietaryRequirements.person_id')
    .select('*')
}


function getFullProfile (db = database) {
    return db('profiles')
    .where('id', id)
    .first()
}


function getProfile(id, db = database) {
    return db('Posts')
    .where('id', id)
    .first()
}


function getUser(id, db = database) {
    return db('profile')
    .where('user_id', id)
    .select()
}


function createUser(userData, db = database){
    return db('profile')
    .insert(userData)
}


function getRequirement(id, db = database) {
    return db('dietaryRequirements')
    .where('Requirement_id', id)
    .select()
}


function getWeekList(id, db = database) {
    return db('profile')
    .where('calendar_id', id)
    .select()
}



//functions go in here

module.exports = {
    joinProfileAndDR,
    getFullProfile,
    getDBAndProfile,
    getUser,
    createUser,
    getProfile,
    getRequirement,
    getWeekList,
}

