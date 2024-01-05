import express from 'express';
import mongoose from '../config/mongodb.js';
import Department from '../models/department.js';
const router = express.Router();

export const saveDepartment = async (req, res) => {
    const department = req.body;
    if (!department.name) {
        res.status(400).send({
            error: true,
            message: "Name is required !"
        })
    }
    const newDepartment = new Department({ ...department, createdAt: new Date().toISOString() })
    try {
        await newDepartment.save();
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            error: true,
            message: "Id is required !"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No department with id: ${id}`);

    try {
        await Department.findByIdAndRemove(id);
        res.json({ message: "department deleted successfully." });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateDepartment = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
    if (!id || !name) {
        res.status(400).send({
            error: true,
            message: "Id and Name are required!"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No department with id: ${id}`);

    try {
        const department = await Department.findById(id);
        department.name = name;

        const updatedDepartment = await department.save();
        res.json(updatedDepartment);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getDepartmentById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({
            error: true,
            message: "Id is required!"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No department with id: ${id}`);

    try {
        const department = await Department.findById(id);

        res.json({ data: department });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDepartments = async (req, res) => {
    const { page, limit } = req.query;

    const options = {
        page: page ?? 1,
        limit: limit ?? 10,
    };

    try {
        const departments = await Department.paginate({}, options);
        res.json({
            data: departments.docs,
            totalPages: departments.totalPages,
            currentPages: departments.page,
            hasNextPages: departments.hasNextPage,
            hasPreviousPages: departments.hasPrevPage,
            totalCollections: departments.totalDocs
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;