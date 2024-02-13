import express from 'express'
import { createProject,updateProject,updateStatus,deleteProject,getProjects } from '../controllers/project';
import authenticateToken from '../middleware/authenticate';

const router = express.Router()

router.route('/create/:assignmentId').post( createProject)
router.route('/delete/:projectId').delete( deleteProject)
router.route('/edit/:projectId').patch(updateProject)
router.route('/action/:assignmentId/:projectId').patch(authenticateToken,updateStatus)
router.route('/:assignmentId').get( getProjects)

export default router