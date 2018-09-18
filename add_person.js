const settings = require("./settings"); // settings.json

const first_name = process.argv[2];
const last_name = process.argv[3];
const birthdate = process.argv[4];

const knex = require('knex')({
    client: 'pg',
    connection: {
        user     : settings.user,
        password : settings.password,
        database : settings.database,
        host     : settings.hostname,
        port     : settings.port,
        ssl      : settings.ssl
    }
  });

const newPerson = {first_name: `${first_name}`, last_name: `${last_name}`, birthdate: `${birthdate}`};
  
knex('famous_people').insert(newPerson)
  .asCallback(function(err, result){
    if (err) {
        return console.error(err);
    } else {
    knex.select("last_name").from("famous_people")
    .then(console.log);
    }
  })