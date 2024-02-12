import { db } from "../lib/db";
const Project = db.project;
import { Request, Response } from "express";
// Create Project
const createProject = async (req: Request, res: Response) => {
    try {
        const { problemStatement, team } = req.body;
        const assignmentId = Number(req.params.assignmentId);
        const project = await Project.create({
            data: {
                problemStatement,
                team,
                assignmentId
            }
        });
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

// Read Projects
const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.findMany({
            where: { assignmentId: Number(req.params.assignmentId) }
        });
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

// Update Project
const updateProject = async (req: Request, res: Response) => {
    try {
        const { problemStatement, team } = req.body;
        const projectId = parseInt(req.params.id);
        const updatedProject = await Project.update({
            where: { id: projectId },
            data: {
                problemStatement,
                team
            }
        });
        res.json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update project' });
    }
};
// Update Assignment
const updateStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const assignmentId: number = Number(req.params.assignmentId);
        const projectId: number = Number(req.params.projectId);
        const facultyId = req.user.id;
        const assgn = await db.assignments.findMany(
            {
                where: {
                    assignmentId,
                    facultyId
                }
            }
        )
        if (assgn == null || assgn.length===0) {
            return res.status(400).json({ msg: 'bad request' });
        };
        const updatedProject = await Project.update({
            where: {
                assignmentId,
                id: projectId
            },
            data: {
                status
            }
        })
        res.json(updatedProject)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update assignment' });
    }
};

// Delete Project
const deleteProject = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id);
        await Project.delete({
            where: { id: projectId }
        });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
};

export {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
    updateStatus
};
