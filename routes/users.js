const express = require('express')
const db = require('../db')
const router = express.Router()
// const router = express()
// const profilesDb = require('../db/profiles')

// Calendar stuff - https://github.com/nhn/tui.calendar/blob/master/docs/getting-started.md
// var Calendar = require('tui-calendar');
// require("tui-calendar/dist/tui-calendar.css");


// var calendar = new Calendar('#calendar', {
//     defaultView: 'month',
//     taskView: true,
//     template: {
//       monthDayname: function(dayname) {
//         return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
//       }
//     }
//   });
  
router.get('/', (req, res) => {
    res.render('index')
})


router.get('/profile', (req, res) => {
    // res.render('profile')
    // res.send("hello?")
    db.getAllProfiles()
    .then(allProfilesData => {
        // console.log(allProfilesData)
        res.render('profileList', {
            allProfilesData: allProfilesData
        })
    })
})


router.get('/profile/:id', (req, res) => {
    let id = req.params.id
    
    db.getProfileAndDRById(id)
    .then(profileData => {
        // console.log(profileData)
        if(profileData.length) {
            res.render('profile', {
                // profileData : profileData,
                name : profileData[0].name,
                img : profileData[0].user_image,
                user_id : profileData[0].user_id,
                requirement : profileData.map(data => data.requirement).filter(data => data != null)
    
            })
        } else {
            res.render('profile')
        }
    })
    // res.render('profile')
})


router.get('/calendar', (req, res) => {
    // get profile data
    // make all calendar days in profile lowercase
    // give the render page profiles info 

    db.getAllProfiles()
    .then(profiles => {
        return profiles.map(singleProfile => {
            singleProfile.daysRostered = singleProfile.daysRostered.toLowerCase()
            return singleProfile
        })    
    })

    .then(profileData => {
            return profileData.map(singleProfile => {
                let day = singleProfile.daysRostered
                let img = singleProfile.user_image
                let newData = {
                    daysRostered: img
                }   
                return newData
            })
        })
        

    // .then(profileData => {
    //     return profileData.map(singleProfile => {
    //         let day = singleProfile.daysRostered
    //         let img = singleProfile.user_image
    //         let newData = {
    //             daysRostered: img
    //         }   
    //         return newData
    //     })
    // })
        // console.log("PROFILES DATA IS: ", profiles[0].daysRostered.toLowerCase())
    .then(profileData => {
        console.log("CALENDARS X IS: ", profileData)
        res.render('calendar', {profileData})
    })
})


router.get('/addUser', (req, res) => {
    res.render('addUser')
})


router.post('/addUser', (req, res) => {
    let userName = req.body.name
    let imgToUpload = req.body.userImage
    let newProfile = {
        name : userName, 
        user_image : imgToUpload,
    }

    db.addNewProfile(newProfile)
    .then(id => {
        // console.log("hello", id)
        res.redirect('/profile/' + id)
    })
})


router.get('/dietaryRequirements', (req, res) => {
    // db.clearSearchedItem()
    // .then(() => {
        db.joinDRAndProfile()
        .then(data => {
            // console.log(data)
            res.render('dietaryRequirements', {
                data: data
            })
        })
    // })
})


router.get('/addDietaryRequirement/:id', (req, res) => {
    res.render('addNewDietaryRequirement', {user_id: req.params.id})
})


router.post('/addDietaryRequirement/:id', (req, res) => {
    let id = req.params.id
    let requirement = req.body.requirement

    db.addDietaryRequirement(id, requirement)
    // db.joinProfileAndDR()
    .then(x => {
        res.redirect('/profile/' + id, )
    })
})


router.post('/searchDietaryRequirements', (req, res) => {
    let searchedItem = req.body.searchItem
    console.log("SEARCHED ITEM: ", searchedItem)

    db.clearSearchedItem()
    .then( () => {
        console.log("YAY, THE CLEARING FUNCTION HAS RUN!")
        db.searchDRDB(searchedItem)
        .then(x => {
            console.log('X IS: ', x)
            res.redirect('dietaryRequirements')
        
        })
    })
})


router.get('/addDayAway/:id', (req, res) => {
    res.render('addDayAway', {user_id: req.params.id})
    //redirect to /calendar
})


router.post('/addDayAway/:id', (req, res) => {
    let id = req.params.id
    let info = req.body.dayEntered

    // console.log('ID IS: ', id) // id is currently undefined :(
    //     console.log('INFO IS: ', info)

    db.addDayAway(id, info)
    .then(id => {
        // console.log("hello", id)
        res.redirect('/calendar')
    })
})


router.get('/selectDay/:id', (req, res) => {
    // get users
    // Pass through in render
    // in /:id use to add if statement around days in list.
    
    // db.getAllRequiregetAllProfilesments()
    // .then(userData = {

    // })

    res.render('addRosteredDay', {user_id: req.params.id})
})


router.post('/selectDay/:id', (req, res) => {
    // define objs to send,
    // add obj to profile
    // update calendar 
    // redirect to calendar
    let id = req.params.id
    let day = req.body.days

    // console.log('ID IS: ', id) // id is currently undefined :(
    //     console.log('INFO IS: ', info)

    db.updateDayInProfile(day, id)
    .then(id => {
        // console.log("hello", id)
        res.redirect('/calendar')
    })
})


    
    // let userName = req.body.name
    // let imgToUpload = req.body.userImage
    // let newProfile = {
    //     name : userName, 
    //     user_image : imgToUpload,
    // }

    // db.addNewProfile(newProfile)
    // .then(id => {
    //     // console.log("hello", id)
    //     res.redirect('/profile/' + id)
    // })
// })

module.exports = router