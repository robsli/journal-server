const AuthService = require('../services/authService')

exports.authenticate_user = AuthService.authenticate_user

exports.authorize_user = AuthService.authorize_user

exports.login = AuthService.login

exports.logout = AuthService.logout
