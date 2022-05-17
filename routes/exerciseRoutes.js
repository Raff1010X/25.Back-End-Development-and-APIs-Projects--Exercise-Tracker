const express = require('express');
const exerciseController = require('../controllers/exerciseController');

const router = express.Router({ mergeParams: true });

router
    .route('/exercises')
    .post(exerciseController.addData, exerciseController.postExercise);

router.route('/logs').get(exerciseController.getExercises);

module.exports = router;
