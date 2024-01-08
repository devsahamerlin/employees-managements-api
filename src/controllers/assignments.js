import express from 'express';
import mongoose from '../config/mongodb.js';
import Department from '../models/department.js';
import Employee from '../models/employee.js';
const router = express.Router();

export const assignEmployeeToDepartment = async (req, res) => {
    const { employeeId, departmentId } = req.body;

    try {
        const department = await Department.findById(departmentId);
        const employee = await Employee.findById(employeeId);

        if (!employee || !department) {
            res.status(400).json({
                error: true,
                message: "employee or department not exist !"
            })
        }

        employee.departments.push(department._id);
        await employee.save();

        department.employees.push(employee._id);
        await department.save();

        res.status(201).json({
            message: "Empployee added successfully.",
            employeeId: employee._id,
            departmentId: department._id
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const removeEmployeeToDepartment = async (req, res) => {
    const { employeeId, departmentId } = req.body;
    try {
        const department = await Department.findById(departmentId);
        const employee = await Employee.findById(employeeId);

        if (!employee || !department) {
            res.status(400).json({
                error: true,
                message: "employee or department not exist !"
            })
        }

        employee.departments.pull(department._id);
        await employee.save();

        department.employees.pull(employee._id);
        await department.save();

        res.status(200).json({
            message: "Empployee removed successfully.",
            employeeId: employee._id,
            departmentId: department._id
        });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getEmployeesByDepartment = async (req, res) => {
    const { departmentId } = req.params;

    const { page, limit } = req.query;

    const options = {
        page: page ?? 1,
        limit: limit ?? 10,
    };

    try {

        if (!departmentId) {
            res.status(400).send({
                error: true,
                message: "Department ID is required !"
            })
        }
        const department = await Department.findById(departmentId).populate('employees');

        res.status(200).json({
            data: department
        });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getEmployeeDepartments = async (req, res) => {
    const { employeeId } = req.params;

    try {

        if (!employeeId) {
            res.status(400).send({
                error: true,
                message: "Employee ID is required !"
            })
        }

        const employee = await Employee.findById(employeeId).populate('departments');

        res.status(200).json({
            data: employee
        });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;