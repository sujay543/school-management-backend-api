const express = require('express');
const schoolController = require('../controllers/schoolController');
const schoolRoute = express.Router();

schoolRoute.route('/').get(schoolController.getSchools);
schoolRoute.route('/addSchool').post(schoolController.addSchool);
schoolRoute.route('/listSchools').get(schoolController.listSchools);

module.exports = schoolRoute;

