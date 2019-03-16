const express = require('express');
const router = require('express-promise-router')();
const controller = require('../controllers/users');

router.route('/signup').post(controller.signUp);

router.route('/signin').post(controller.signIn);

router.route('/secret').post(controller.secret);

module.exports = router;