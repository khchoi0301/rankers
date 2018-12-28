const Sequelize = require('sequelize')
const db = {}


// sqlite
// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   storage: './db.sqlite',
//   logging: false,
// })

// const User = sequelize.define('User', {
//   // name: Sequelize.STRING, //varchar255
//   name: {
//     type: Sequelize.STRING,
//     unique: true
//   }
// })


const config = {
  "username": "admin",
  "password": "admin1234",
  "database": "ranker",
  "host": "ranker.ccynmvowwgby.us-west-2.rds.amazonaws.com",
  "dialect": "mysql",
  "timezone": "+09:00",
  "operatorsAliases": "false",
  "logging": false
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    dialectOptions: {
      useUTC: false
    }
  }
)





db.sequelize = sequelize
db.Sequelize = Sequelize
db.User = require('./user')(sequelize, Sequelize)

module.exports = db