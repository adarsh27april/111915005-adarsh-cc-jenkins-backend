const express = require("express");

const { addReport, readReport } = require('../controllers/report');

const reportRouter = express.Router();

reportRouter.post('/add', addReport)

reportRouter.get('/read/:employeeID', readReport)

module.exports = reportRouter;
