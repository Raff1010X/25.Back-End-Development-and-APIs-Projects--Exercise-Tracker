const Exercise = require('../models/exerciseModel');
const User = require('../models/userModel');
const factory = require('./handlerFactory');

exports.addData = async (req, res, next) => {
    if (req.params._id) req.body.user_id = req.params._id;
    if (!req.body.date) req.body.date = new Date();

    next();
};

exports.getExercises = factory.getOne(User);
exports.postExercise = factory.createOne(Exercise);
