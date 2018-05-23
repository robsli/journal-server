const express = require('express')
const router = express.Router()

const AuthService = require('../services/authService')
const UserDBService = require('../services/userDatabaseService')

router.get('/:username', UserDBService.get_user)

router.post('/addUser', UserDBService.add_user)

router.put('/updateUser', AuthService.authorize_user, UserDBService.update_user)

// router.delete('/deleteUser', UserDBService.delete_user)

module.exports = router
