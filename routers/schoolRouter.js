const express = require('express');
const schoolController = require('../controllers/schoolController');
const schoolRoute = express.Router();

schoolRoute.route('/').get(schoolController.getSchools);


module.exports = schoolRoute;

