const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const firstName = 'John';
const lastName = 'Doe';
const department = 'IT';

describe('Employee', () => {
    it('should throw an error if no args', () => {
        const emp = new Employee({});
        const err = emp.validateSync();
        expect(err.errors).to.exist;
    });

    it('should throw error if firstName is empty', () => {
        const emp = new Employee({
            firstName: '', 
            lastName: lastName[0], 
            department: department[0]
        });
        const err = emp.validateSync();
        expect(err.errors).to.exist;
    });
    
    it('should throw error if lastName is empty', () => {
        const emp = new Employee({
            firstName: firstName, 
            lastName: '', 
            department: department
        });
        const err = emp.validateSync();
        expect(err.errors).to.exist;
    });
    
    it('should throw error if departament is empty', () => {
        const emp = new Employee({
            firstName: firstName, 
            lastName: lastName, 
            department: ''
        });
        const err = emp.validateSync();
        expect(err.errors).to.exist;
    });

    it('should not thow error if all arg is ok', () => {
        const emp = new Employee({
            firstName: firstName, 
            lastName: lastName, 
            department: department
        });
        const err = emp.validateSync();
        expect(err).to.not.exist;
    });
});