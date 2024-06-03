let express = require('express')

let app = express()

let cors = require('cors')
let database = require('./models/databaseConnect')
// Import your exported database functions

// For parsing our add requests
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(cors())


// Specifically create a synchronous middleware function
app.get('/monsters-api/all', async (req, res) => {
    // let results = await database.queryFunctions.getPeople()
    let results = await database.queryFunctions.getMonsters()
    res.json(results)
    // Attach our results to the response as a JSON
})

app.post('/monsters-api/add', async (req, res) => {
    console.log("Add Monster Received")

    let witness = req.body.witness
    let phone_num = req.body.phone_num
    let monster = req.body.monster
    let location_name = req.body.location_name
    let time_reported = req.body.time_reported
    let coord_x = req.body.coord_x
    let coord_y = req.body.coord_y
    let status = req.body.status
    let picture = req.body.picture
    let addInfo = req.body.addInfo
    // Extract our JSON object from the body of our request

    // let results = await database.queryFunctions.addPerson(name, age, instructor)
    let results = await database.queryFunctions.addMonster(witness, phone_num, monster, location_name, time_reported, 
        coord_x, coord_y, status, picture, addInfo)
    res.redirect('/monsters-api/all')
    // Redirect user to '/people-api/all' after POST (performs GET request after POST)
})

app.delete('/monsters-api/delete/:id', async (req, res) => {
    let id = req.params.id
    await database.queryFunctions.deleteById(id)

})

app.get('/monsters-api/locations/all', async (req, res) => {
    // let results = await database.queryFunctions.getPeople()
    let results = await database.queryFunctions.getLocations()
    res.json(results)
    // Attach our results to the response as a JSON
})

app.post('/monsters-api/locations/add', async (req, res) => {
    let coord_x = req.body.coord_x
    let coord_y = req.body.coord_y
    let location_name = req.body.location_name
    // Extract our JSON object from the body of our request

    // let results = await database.queryFunctions.addPerson(name, age, instructor)
    let results = await database.queryFunctions.addLocation(coord_x, coord_y, location_name)
    res.redirect('/monsters-api/locations/all')
    // Redirect user to '/people-api/all' after POST (performs GET request after POST)
})

async function InitDB() {
    await database.queryFunctions.init()
    let results = await database.queryFunctions.getMonsters()
    // people = results
}


InitDB().then(() => {
        app.listen(8000, () => {
            console.log("server is running on port 8000")
            })
        })
        .catch((err) => { 
            console.log(err)
            // Catch and print any errors
        })



app.listen(3000, () => {
    console.log("server is running on port 3000")
})