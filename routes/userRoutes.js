const express = require('express');
const userController = require('../controllers/userController');
const exerciseRouter = require('./exerciseRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:_id', exerciseRouter);

router.route('/').post(userController.postUser).get(userController.getUsers);

module.exports = router;
