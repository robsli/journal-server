const express = require('express')
const router = express.Router()

const user_controller = require('../controllers/userController')
const auth_controller = require('../controllers/authController')

router.get('/:username', user_controller.get_user)

router.post('/addUser', user_controller.add_user)

router.put('/updateUser', auth_controller.authorize_user, user_controller.update_user)

// router.delete('/deleteUser', user_controller.delete_user)

module.exports = router
