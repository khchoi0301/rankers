const models = require('../models/index')

const options = { force: process.env.NODE_ENV === 'test' ? true : false }//force true 기존 DB를 날리고 새로 동기화
const users = [{ name: 'alice', email: 'alice@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
{ name: 'chris', email: 'chris@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' }]

const sync = () => models.sequelize.sync(options)
const addUsers = () => models.User.bulkCreate(users)

console.log('options', options)

module.exports = { sync, addUsers }

