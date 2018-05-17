const bcrypt = require('bcrypt')
const debug = require('debug')('app:userModel')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Configure hashing
const saltRounds = 10

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    }
  })

UserSchema.pre('save', async function() {
  let user = this
  debug('user.password: ' + user.password)
  debug('saltRounds ' + saltRounds)
  await bcrypt.hash(user.password, saltRounds)
    .then((hash) => {
      user.password = hash
    })
    .catch((err) => {
      debug(err.stack)
    })
})

module.exports = User = mongoose.model('User', UserSchema)
