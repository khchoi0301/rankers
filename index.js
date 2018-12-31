var express = require('express')
var app = express()
var morgan = require('morgan')
var bodyParser = require('body-parser')
var user = require('./api/user/index')
var service = require('./api/service/index')
var review = require('./api/review/index')

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//User API
app.use('/users', user)
//Service API
app.use('/service', service)
//Review API
app.use('/review', review)

module.exports = app
