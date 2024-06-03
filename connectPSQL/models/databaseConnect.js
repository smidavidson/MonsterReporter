// Start using nodemon server.js

let { Pool } = require('pg');
let pool

pool = new Pool({
    connectionString: 'postgres://postgres:root@localhost:5432/project1?user=postgres&password=X'

})

let queryFunctions = {
    init: async function() {
        let q = 'CREATE TABLE IF NOT EXISTS reportedMonsters(id SERIAL PRIMARY KEY, witness VARCHAR(50), phone_num numeric, \
            monster VARCHAR(100), location_name VARCHAR(100), time_reported numeric, coord_x numeric, coord_y numeric, status boolean, picture VARCHAR(300), \
            addInfo VARCHAR(200)) '
        let res1 = await pool.query(q)

        let k = 'CREATE TABLE IF NOT EXISTS monsterLocations(id SERIAL PRIMARY KEY, coord_x numeric, coord_y numeric, location_name VARCHAR(100))'
        let res2 = await pool.query(k)
    },

    getMonsters: async function() {
        let results = await pool.query('SELECT * FROM reportedMonsters')
        return results.rows
    },
    
    addMonster: async function(witness, phone_num, monster, location_name, time_reported, 
        coord_x, coord_y, status, picture, addInfo) {
        console.log(`${witness}, ${phone_num}, ${monster}, ${location_name}, ${time_reported}, ${coord_x}, ${coord_y}, ${status}, ${picture}, ${addInfo}`)

        let ourQuery = 'INSERT INTO reportedMonsters(witness, phone_num, monster, location_name, \
        time_reported, coord_x, coord_y, status, picture, addInfo) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
        let res = await pool.query(ourQuery, [witness, phone_num, monster, location_name, time_reported, 
            coord_x, coord_y, status, picture, addInfo])
    },

    // Delete cryptid by id
    deleteById: async function(id) {
        let q = 'DELETE FROM reportedMonsters WHERE id = $1'
        let res = await pool.query(q, [id])
    },

    getLocations: async function() {
        let results = await pool.query('SELECT * FROM monsterLocations')
        return results.rows
    },

    addLocation: async function(coord_x, coord_y, location_name) {
        let ourQuery = 'INSERT INTO monsterLocations(coord_x, coord_y, location_name) \
         VALUES($1, $2, $3)'
        let res = await pool.query(ourQuery, [coord_x, coord_y, location_name])
    },

}   

module.exports = { queryFunctions }