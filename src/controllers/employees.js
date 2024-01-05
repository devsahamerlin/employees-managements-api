import express from 'express';
import mongoose from '../config/mongodb.js';
import Employee from '../models/employee.js';
const router = express.Router();

export const saveEmployee = async (req, res) => {
    const employee = req.body;
    const newEmployee = new Employee({ ...employee, createdAt: new Date().toISOString() })
    try {
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            error: true,
            message: "Id is required!"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);

    try {
        await Employee.findByIdAndRemove(id);

        res.json({ message: "employee deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateEmployee = async (req, res) => {

    const { id } = req.params;
    const { name, surname, departmentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);

    try {
        const employee = await Employee.findById(id);
        employee.name = name;
        employee.surname = surname;
        employee.departmentId = departmentId;
        const updatedEmployee = await employee.save();

        res.json(updatedEmployee);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            error: true,
            message: "Id is required!"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);

    try {
        const employee = await Employee.findById(id);

        res.json({ data: employee });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getEmployeeByDepartment = async (req, res) => {
    const { departmentId } = req.params;
    const { page, limit } = req.query;

    const options = {
        page: page ?? 1,
        limit: limit ?? 10,
    };

    if (!departmentId) {
        res.status(400).send({
            error: true,
            message: "departmentId is required!"
        })
    }
    try {
        const employees = await Employee.paginate({ departmentId: departmentId }, options);
        res.json({
            data: employees.docs,
            totalPages: employees.totalPages,
            currentPages: employees.page,
            hasNextPages: employees.hasNextPage,
            hasPreviousPages: employees.hasPrevPage,
            totalCollections: employees.totalDocs
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getEmployees = async (req, res) => {
    const { page, limit } = req.query;

    const options = {
        page: page ?? 1,
        limit: limit ?? 10,
    };

    try {
        const employees = await Employee.paginate({}, options);
        res.json({
            data: employees.docs,
            totalPages: employees.totalPages,
            currentPages: employees.page,
            hasNextPages: employees.hasNextPage,
            hasPreviousPages: employees.hasPrevPage,
            totalCollections: employees.totalDocs
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;