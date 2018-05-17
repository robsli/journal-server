const AuthService = require('../services/authService')

exports.authenticate_user = AuthService.authenticate_user

exports.authorize_user = AuthService.authorize_user

exports.logout = AuthService.logout
