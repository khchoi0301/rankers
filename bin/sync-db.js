const { sequelize, User, Review, Service } = require('../models/index')

const users = [{ name: 'alice', email: 'alice@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' }]
const reviews = [{ title: 'was good', contents: '좋아요', stars: 5, img: 'img.jpg', UserId: 1, ServiceId: 1 }]
const services = [{ service: 'wedding city', location: 'seoul', profile: 'img.jpg' }]

// const options = { force: process.env.NODE_ENV === 'test' ? true : false }//force true 기존 DB를 날리고 새로 동기화
// const sync = () => sequelize.sync(options)
// console.log('options', options)

const sync = () => sequelize.sync({ force: true })
const addUsers = () => User.bulkCreate(users)
const addServices = () => Service.bulkCreate(services)
const addReviews = () => Review.bulkCreate(reviews)

module.exports = { sync, addUsers, addReviews, addServices }
