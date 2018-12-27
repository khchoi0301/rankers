// const http = require('http')

// const hostname = '127.0.0.1'
// const port = 3000

// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('Hello World\n')
//   } else if (req.url === '/users') {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('User list\n')
//   } else {
//     res.statusCode = 404
//     res.end('page not found')
//   }
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })


// const express = require('express')
// const app = express();
// const morgan = require('morgan')

// function commonmw(req, res, next) {
//   console.log('commonmw')
//   next(new Error('error occured'))
// }

// function errormw(err, req, res, next) {
//   console.log(err.message)
//   next()
// }

// function logger(req, res, next) {
//   console.log('I am logger')
//   next()
// }

// function logger2(req, res, next) {
//   console.log('I am logger2')
//   next()
// }

// app.use(logger);
// app.use(logger2);

// app.use(commonmw)
// app.use(errormw)

// app.listen(3000, () => {
//   console.log('server is running')
// })



var express = require('express');
var app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser')
var user = require('./api/user/index')

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', user)

module.exports = app