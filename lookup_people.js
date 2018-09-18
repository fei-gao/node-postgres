const {Client} = require('pg');
const settings = require("./settings"); // settings.json

const client = new Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });

const searchData = process.argv.slice(2);

const query = 'SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1';

const queryHandler = (err,res) => {
    if(err) return err.stack;
    console.log(`Found ${res.rowCount} person(s) by the name '${searchData}'`);
    if(res.rowCount){
        if(res.rowCount > 1){
            res.rows.forEach(function(person, index){
                console.log(`- ${index+1}: ${person.first_name} ${person.last_name}, born '${person.birthdate.toISOString().slice(0,10)}'`);
            })
        } else {
            console.log(`- 1: ${person.first_name} ${person.last_name}, born '${person.birthdate}'`);
        }
    } else {
        console.log("found nothing in match");
    };
    client.end();
};

function runQuery(query, values, cb){
    console.log("Searching ...");
    client.query(query, values, cb);
}


client.connect();
runQuery(query, searchData, queryHandler);
