import express from 'express';
import { saveEmployee, getEmployeeById, getEmployees, getEmployeeByDepartment, updateEmployee, deleteEmployee} from '../controllers/employees.js';
const router = express.Router();

router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.get('/:departmentId/department', getEmployeeByDepartment);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.post('/', saveEmployee);

export default router;