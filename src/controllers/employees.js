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
        res.status(400).json({
            error: true,
            message: "Id is required!"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json(`No employee with id: ${id}`);

    try {
        await Employee.findByIdAndDelete(id);

        res.status(200).json({ message: "employee deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateEmployee = async (req, res) => {

    const { id } = req.params;
    const { name, surname, birthDate, departmentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json(`No employee with id: ${id}`);

    try {
        const employee = await Employee.findById(id);
        employee.name = name;
        employee.surname = surname;
        employee.birthDate = birthDate;
        employee.departmentId = departmentId;
        const updatedEmployee = await employee.save();

        res.status(201).json(updatedEmployee);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            error: true,
            message: "Id is required!"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json(`No employee with id: ${id}`);

    try {
        const employee = await Employee.findById(id);

        res.status(200).json({ data: employee });
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
        res.status(200).json({
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