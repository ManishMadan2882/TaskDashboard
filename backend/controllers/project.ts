import { db } from "../lib/db";
const Project = db.project;
import { Request, Response } from "express";
// Create Project
const createProject = async (req: Request, res: Response) => {
    try {
        let { problemStatement, team } = req.body;
        team = team.map((usn:string) => usn.toUpperCase())
        const assignmentId = Number(req.params.assignmentId);
        const assgn = await db.assignment.findUnique({where:{id:assignmentId}})
        if(!assgn)return res.status(400).json({msg:'not found'});
        if(assgn.teamSize < team.length)
        return res.status(400).json({error:'Team limit exceeded !'})
        const checkExistence = await Project.findMany({
            where:{
                assignmentId,
                problemStatement:problemStatement
            }
        });
        if(checkExistence.length > 0)
        {
            return res.json({
                error : 'Problem statement already exists'
            })
        }
        const checkUSNExistence = await Project.findMany({
            where:{
                assignmentId,
                team:{
                    hasSome:[...team]
                }
            }
        });
        if(checkUSNExistence.length > 0)
        {
            return res.json({
                error : 'Some of the team members have already submitted'
            })
        }
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
        const projectId = parseInt(req.params.projectId);
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
        console.log(assignmentId,projectId);
        
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
        const projectId = parseInt(req.params.projectId);
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
