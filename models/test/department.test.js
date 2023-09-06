const Department = require('../department.model.js');
const expect = require('chai').expect;

describe('Department', () => {
    it('should throw an error if no "name" arg', () => {
        const dep = new Department({}); // create new Department, but don't set `name` attr value
        const err = dep.validateSync();
        expect(err.errors.name).to.exist;
    });

    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];
        for (let name of cases) {
            const dep = new Department({ name });
            const err = dep.validateSync();
            expect(err.errors.name).to.exist;
        }
    });

    it('name should have min length 5 and max length 20 characters', () => {
        const names = ['Dep', 'Deportamentdeportament'];
        for (let name of names) {
            const dep = new Department({ name });
            const err = dep.validateSync();
            expect(err.errors.name).to.exist;
        }
    });

    it('should not throw error is name is ok', () => {
        const name = 'Departament';
        const dep = new Department({ name });
        const err = dep.validateSync();
        expect(err).to.not.exist;
    });
});