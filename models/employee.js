const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeID: Number,
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    contactNumber: Number,
})

employeeSchema.methods.speak = function speak() {
    const data = {
        employeeID: this.employeeID,
        password: this.password,
        firstName: this.password,
        lastName: this.lastName,
        dateOfBirth: this.dateOfBirth
    }
    console.log('data to be added to the DB: ', data);
}

const employeeModel = mongoose.model('employeeModel', employeeSchema);

module.exports = employeeModel;

