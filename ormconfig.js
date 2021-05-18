
module.exports = {
    "type": "postgres",
    "host" : process.env.DB_HOST,
    "port": 5432,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "synchronize": false,
    "entities": [
        "./dist/app/models/*.js",
    ],
    "migrations":[
        "./dist/database/migrations/*.js"
    ],
    "cli":{
        "migrationsDir":"./src/database/migrations"
    }
}