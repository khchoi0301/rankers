const Sequelize = require('sequelize')
const db = {}

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
db.Service = require('./service')(sequelize, Sequelize)
db.Review = require('./review')(sequelize, Sequelize)

db.User.hasMany(db.Review)
db.Review.belongsTo(db.User)

db.Service.hasMany(db.Review)
db.Review.belongsTo(db.Service)

module.exports = db
