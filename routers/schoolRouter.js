const express = require('express');
const schoolController = require('../controllers/schoolController');
const schoolRoute = express.Router();

schoolRoute.route('/').get(schoolController.getSchools);
schoolRoute.route('/addSchool').post(schoolController.insertSchool);

module.exports = schoolRoute;

