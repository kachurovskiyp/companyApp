const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employees.controller');

router.get('/employees', EmployeeController.getAll);

router.get('/employees/random', EmployeeController.getRandom);

router.get('/employees/:id', EmployeeController.getById);

router.post('/employees', EmployeeController.addItem);

router.put('/employees/:id', EmployeeController.changeItem);

router.delete('/employees/:id', EmployeeController.deleteItem);

module.exports = router;
