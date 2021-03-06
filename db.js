const knex = require('knex')
const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const database = knex(config)


// db('profiles').select().then(data => {
//     // console.log('Is this bring back data?', data)
// })

function joinProfileAndDR (db = database) {
    return db ('dietaryRequirements')
    .join('profiles', 'dietaryRequirements.person_id', 'profiles.user_id')
    // .select('*')
    // .then(x => {
    //     console.log(x) 
    //    //call the function below with x as argument
    //     // then run  node db.js on terminal
    // })
}


function joinDRAndProfile (db = database) {
    return db ('profiles')
    .join('dietaryRequirements', 'profiles.user_id', 'dietaryRequirements.person_id')
    // .select('*')
}


function getProfileAndDRById (id, db = database) {
    return db ('profiles')
    .where('user_id', id)
    .leftJoin('dietaryRequirements', 'profiles.user_id', 'dietaryRequirements.person_id')
    // .select('*')
}


function getAllProfiles (db = database) {
    return db('profiles')
    .select()
}


function getProfile(id, db = database) {
    // console.log('ID IS: ', id)
    return db('profiles')
    // .where('user_id', id)
    .select()
}


function addNewProfile(personInfo, db = database){
    return db('profiles')
    .insert(personInfo)
}


function updateDayInProfile(day, id, db = database) {
    return db('profiles') 
    .where('user_id', id)
    .update('daysRostered', day)
}


function getProfileIdWithName(name, db = database) {
    return db('profiles')
    .where('name', name)
    .select('user_id')
}


function getRequirement(id, db = database) {
    return db('dietaryRequirements')
    .where('requirement_id', id)
    .select()
}


function getAllRequirements (db = database) {
    return db('dietaryRequirements')
    .select()
}


function addDayAway(id, info, db = database) {
    return db('profiles')
    .where('user_id', id)
    .update('daysAway', info)
}


function getWeekList(id, db = database) {
    return db('profiles')
    .where('calendar_id', id)
    .select()
}


function clearSearchedItem(db = database) {
    return db('dietaryRequirements')
    .update('searchItem', null)
}


function searchDRDB(searchedItem, db = database) {
    console.log('FUNCTION HAS GOT SEARCHEDITEM, ITS: ', searchedItem)
    return db('dietaryRequirements')
    .where('requirement', searchedItem)
    .update('searchItem', 'Marked')
}

function addDietaryRequirement(id, requirement, db = database) {
    return db('dietaryRequirements')
    .insert({
        person_id: id, 
        requirement,
    })
}




//functions go in here

module.exports = {
    joinProfileAndDR,
    getProfileAndDRById,
    joinDRAndProfile,
    getAllProfiles,
    getProfile,
    addNewProfile,
    updateDayInProfile,
    getProfileIdWithName,
    getRequirement,
    getAllRequirements,
    addDayAway,
    getWeekList,
    clearSearchedItem,
    searchDRDB,
    addDietaryRequirement,
}

