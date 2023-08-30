const {Sequelize} = require('sequelize');

const db = new Sequelize('sequelize_api','root','',{
    host : 'localhost',
    dialect : 'mysql',
    pool : {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.authenticate().then(() => {
    console.log("Database Connection Successfully...!");
})
.catch((e) => {
    console.log("e.",e);
})

module.exports = db;