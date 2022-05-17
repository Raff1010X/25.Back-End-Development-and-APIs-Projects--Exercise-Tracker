const User = require('../models/userModel');
const factory = require('./handlerFactory');

exports.postUser = factory.createOne(User);
exports.getUsers = factory.getAll(User);
