import { db } from "../lib/db";
import { Request, Response } from "express";
const Assignment = db.assignment;
import { RequestCustom } from "../custom";
// Create Assignment

const createAssignment = async (req: RequestCustom, res: Response) => {
    try {
        const { title, description, teamSize, deadline, facultyId } = req.body;
        const assignment = await Assignment.create({
            data: {
                title,
                description,
                teamSize,
                deadline,
                facultyId
            }
        });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create assignment' });
    }
};

// Read Assignments
const getAssignments = async (req: Request, res: Response) => {
    try {
        const id = req.user.id;
        const assignments = await Assignment.findMany({
            where: { facultyId: req.user.id },
        });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};

// Update Assignment
const updateAssignment = async (req: Request, res: Response) => {
    try {
        const { title, description, teamSize, deadline } = req.body;
        const assignmentId:number = Number(req.params.id);
        const facultyId = req.user.id;
        const updatedAssignment = await Assignment.update({
            where:{id:assignmentId,facultyId},
            data:{
                title,
                description,
                teamSize,
                deadline
            }
        });
        res.json(updatedAssignment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update assignment' });
    }
};

// Delete Assignment
const deleteAssignment = async (req: Request, res: Response) => {
    try {
        const assignmentId = Number(req.params.id);
        await Assignment.delete({
            where:{id:assignmentId,facultyId:req.user.id}
        });
        res.json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete assignment' });
    }
};

export {
    createAssignment,
    getAssignments,
    updateAssignment,
    deleteAssignment
};
