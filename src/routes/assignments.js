import express from 'express';
import { assignEmployeeToDepartment, removeEmployeeToDepartment, getEmployeesByDepartment, getEmployeeDepartments } from '../controllers/assignments.js';

const router = express.Router();

router.post('/assign', assignEmployeeToDepartment);
router.post('/remove', removeEmployeeToDepartment);
router.get('/:departmentId/employees', getEmployeesByDepartment);
router.get('/:employeeId/departments', getEmployeeDepartments);

export default router;