const routes = require('express').Router();
const ProcessController = require('../controllers/ProcessController');

routes.post('/check', ProcessController.check);


module.exports = routes;