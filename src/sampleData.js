const debug = require('debug')('app:sampleData')
const mongoose = require('mongoose')

const User = require('./models/User')

module.exports = [
  { name: 'Sample Entry', user: 'public', createdDate: new Date('2018-01-01'), notes: 'Welcome to My Journal App! It seems like it may be your first time here, so let me show you around.' },
  { name: 'This is a journal entry', user: 'public', createdDate: new Date('2018-02-02'), notes: 'You can update the entry title and notes. Just click on \'update\' to my right!' },
  { name: 'Excellent Job!', user: 'public', createdDate: new Date('2018-03-03'), notes: 'Not a fan of this entry? Just click on the \'delete\' button to my right and I will vanish.' },
  { name: 'Want to add a new journal entry?', user: 'public', createdDate: new Date('2018-04-04'), notes: 'Of course you do. Simply click on the \'+\' icon on the upper left, and fill out the fields. Once you click save, your journal entry should appear at the bottom' },
  { name: 'Looking for a specific entry?', user: 'public', createdDate: new Date('2018-05-05'), notes: 'There is a handy dandy search feature above. Just type in the text you\'re looking for, and I\'ll let you know what I find.' },
  { name: 'Top secret', user: 'private', createdDate: new Date('2018-05-14'), notes: 'This is a top secret post!'}
]
