const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const employees = [
    {
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT'
    },
    {
        firstName: 'Fill',
        lastName: 'Richards',
        department: 'Marketing'
    },
];


describe('Employee Reading data', () => {
    before(async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            console.error(err);
        }

        const testEmpOne = new Employee({ firstName: employees[0].firstName, lastName: employees[0].lastName, department: employees[0].department });
        await testEmpOne.save();

        const testEmpTwo = new Employee({ firstName: employees[1].firstName, lastName: employees[1].lastName, department: employees[1].department });
        await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
        const employees = await Employee.find();
        const expectedLength = 2;
        expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
        const employee = await Employee.findOne({ firstName: employees[0].firstName });
        expect(employee.firstName).to.be.equal(employees[0].firstName);
    });

    after(async () => {
        await Employee.deleteMany();
    });
});

describe('Employee Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
        const testEmpOne = new Employee({ firstName: employees[0].firstName, lastName: employees[0].lastName, department: employees[0].department });
        await testEmpOne.save();
        expect(testEmpOne.isNew).to.be.false;
    });

    after(async () => {
        await Employee.deleteMany();
    });
});

describe('Employee Updating data', () => {
    beforeEach(async () => {
        const testEmpOne = new Employee({ firstName: employees[0].firstName, lastName: employees[0].lastName, department: employees[0].department });
        await testEmpOne.save();

        const testEmpTwo = new Employee({ firstName: employees[1].firstName, lastName: employees[1].lastName, department: employees[1].department });
        await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
        await Employee.updateOne({ firstName: employees[0].firstName }, { $set: { firstName: 'Jack' } });
        const updatedDEmployee = await Employee.findOne({ firstName: 'Jack' });
        expect(updatedDEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
        await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
        const employees = await Employee.find({ firstName: 'Updated!' });
        expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
        await Employee.deleteMany();
    });
});

describe('Employee Removing data', () => {
    beforeEach(async () => {
        const testEmpOne = new Employee({ firstName: employees[0].firstName, lastName: employees[0].lastName, department: employees[0].department });
        await testEmpOne.save();

        const testEmpTwo = new Employee({ firstName: employees[1].firstName, lastName: employees[1].lastName, department: employees[1].department });
        await testEmpTwo.save();
      });

    it('should properly remove one document with "deleteOne" method', async () => {
        await Employee.deleteOne({ firstName: employees[0].firstName });
        const removeEmployee = await Employee.findOne({ firstName: employees[0].firstName});
        expect(removeEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
        await Employee.deleteMany();
        const employees = await Employee.find();
        expect(employees.length).to.be.equal(0);
    });

      
    afterEach(async () => {
        await Employee.deleteMany();
      });
});