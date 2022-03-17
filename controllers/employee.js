const mongoose = require("mongoose")
const employeeModel = require("../models/employee");

/**
 * route => /user/register
 */
const registerUser = async (req, res) => {
	// console.log('req.body.employeeID', req.body.employeeID);
	const { employeeID, password, firstName, lastName, dateOfBirth } = req.body;
	console.log("data received, employeeID: ", employeeID);

	let user = await employeeModel.findOne({ employeeID });
	if (user) {
		return res.status(500).json({
			msg: `User with username: ${employeeID} already exist`,
			success: false,
		})
	}

	user = new employeeModel({ employeeID, password, firstName, lastName, dateOfBirth });
	await user.save();
	user.speak();

	let data = { msg: 'register Success', employeeID, firstName, success: true }
	res.status(200).json(data)
}


const loginUser = async (req, res) => {

	const { employeeID, password } = req.body;
	console.log("data received, employeeID: ", employeeID);

	let user = await employeeModel.findOne({ employeeID });
	if (!user) {
		return res.status(404).json({ msg: `${employeeID} doesn't exist`, success: false })

	} else if (user.password !== password) {
		return res.status(404).json({ msg: `Wrong Password`, success: false })
	}
	res.status(200).json({ msg: `Login Success`, success: true, employeeID, firstName: user.firstName })
}

module.exports = { registerUser, loginUser }
