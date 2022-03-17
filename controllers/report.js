const mongoose = require("mongoose")
const salaryModel = require("../models/report");
const employeeModel = require('../models/employee');

const addReport = async (req, res) => {
	console.log('inside addUserData report.js controller=>\n', req.body);

	const { employeeID, jobRole, monthlySalary, yearlyBonus, } = req.body;
	console.log("data received, employeeID: ", employeeID);

	let employeeData = await employeeModel.findOne({ employeeID });
	if (!employeeData) {
		// i.e. data not found in employeeData
		return res.status(404).json({
			msg: `No account exists for Employee id: ${employeeID} first create an account for adding data`
		})
	}

	let user = await salaryModel.findOne({ employeeID });
	if (!user) {
		user = new salaryModel({
			employeeID, jobRole, monthlySalary, yearlyBonus
		})

		await user.save();
		user.speak();

		let data = { msg: 'addition Success', employeeID, success: true }
		return res.status(200).json(data)
	}

	res.status(400).json({
		success: false,
		msg: `data already present for Employee ID : ${employeeID}`
	})
}

/**
 * 
 * Route => http://localhost:8430/report/read/:employeeID
 */
const readReport = async (req, res) => {
	console.log(req.params)
	console.log('inside server.js')
	// console.log("req.body :  ", req.body);
	const employeeID = req.params.employeeID;
	// console.log(req.body.employeeID);

	let salaryData = await salaryModel.findOne({ employeeID });
	let employeeData = await employeeModel.findOne({ employeeID });
	console.log(employeeData);
	console.log(salaryData);

	if (!employeeData) {
		// i.e. data not found in employeeData
		return res.status(404).json({ msg: `No account exists for Employee id: ${employeeID}` })
	}

	if (salaryData) {
		let data = {
			employeeID: employeeID,
			firstName: employeeData.firstName,
			lastName: employeeData.lastName,
			dateOfBirth: employeeData.dateOfBirth,

			jobRole: salaryData.jobRole,
			monthlySalary: salaryData.monthlySalary,
			yearlyBonus: salaryData.yearlyBonus
		}

		return res.status(200).json(data);
	}

	res.status(404).json({ msg: `data not found for Employee id: ${employeeID}` })
}

module.exports = { addReport, readReport };
