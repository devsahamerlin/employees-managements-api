import express from 'express';
import { saveDepartment, updateDepartment, getDepartmentById, getDepartments, deleteDepartment} from '../controllers/departments.js';

const router = express.Router();

router.get('/', getDepartments);
router.get('/:id', getDepartmentById);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);
router.post('/', saveDepartment);

export default router;