import express from 'express'
import { createAssignment,getAssignment, getAssignments, deleteAssignment, updateAssignment } from '../controllers/assignments';
import authenticateToken from '../middleware/authenticate';

const router = express.Router()

router.route('/create').post(authenticateToken, createAssignment)
router.route('/delete/:id').delete(authenticateToken, deleteAssignment)
router.route('/edit/:id').patch(authenticateToken, updateAssignment)
router.route('/').get(authenticateToken, getAssignments)
router.route('/:id').get(getAssignment)

export default router