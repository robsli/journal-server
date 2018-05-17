const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const debug = require('debug')('app')
const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const fs = require('fs')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const sampleData =require('./src/sampleData')

const Entry = require('./src/models/Entry')
const User = require('./src/models/User')

const app = express()

app.use(helmet())
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader('Access-Control-Allow-Origin', 'https://journal-app.surge.sh')
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, credentials")
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

// Auth-related middleware
app.use(cookieParser())
app.use(session({
  key: 'user_id',
  secret: 'shhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 3600000,
    httpOnly: false,
    maxAge: 36000000,
    secure: false }
}))
app.use((req, res, next) => {
  if (req.cookies.user_id && !req.session.user) {
    res.clearCookie('user_id')     
  }
  next()
})

// Done with Auth stuff
app.use(morgan('dev'))
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'userActions.log'), { flags: 'a'})
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Auth related
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_id) {
    res.redirect('/')
  } else {
    next()
  }
}

const localUrl = 'mongodb://localhost:27017'
const mlabUrl = 'mongodb://admin:test1234@ds161529.mlab.com:61529/journal-entries'

mongoose.connect(mlabUrl)
mongoose.Promise = global.Promise
const mongooseDb = mongoose.connection
mongooseDb.on('error', console.error.bind(console, 'MongoDB connection error:'))

const entriesRoute = require('./src/routes/entries')
const userRoute = require('./src/routes/user')
const indexRoute = require('./src/routes/index')

app.use('/entries', entriesRoute)
app.use('/user', userRoute)
app.use('/', indexRoute)

// TODO: Write tests, error handling

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port
  debug(`Listening on port ${port}`)
})
