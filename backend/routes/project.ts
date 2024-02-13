import express from 'express'
import { createProject,updateProject,updateStatus,deleteProject,getProjects } from '../controllers/project';
import authenticateToken from '../middleware/authenticate';

const router = express.Router()

router.route('/create').post(authenticateToken, createProject)
router.route('/delete/:projectId').delete(authenticateToken, deleteProject)
router.route('/edit/:projectId').patch(updateProject)
router.route('/edit/:assignmentId/:projectId').patch(authenticateToken,updateStatus)
router.route('/:assignmentId').get(authenticateToken, getProjects)

export default router