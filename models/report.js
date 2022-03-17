const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
    employeeID: Number,
    jobRole: String,
    monthlySalary: Number,
    yearlyBonus: Number,
})

salarySchema.methods.speak = function speak() {
    const data = {
        employeeID: this.employeeID,
        jobRole: this.jobRole,
        monthlySalary: this.monthlySalary,
        yearlyBonus: this.yearlyBonus,
    }
    console.log('data to be added to the DB: ', data)
}

const salaryModel = mongoose.model('salaryModel', salarySchema);

module.exports = salaryModel;

