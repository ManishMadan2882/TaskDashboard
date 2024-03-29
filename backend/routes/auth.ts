import express from 'express'
import { getUser, loginUser, registerUser } from '../controllers/auth';
import authenticateToken from '../middleware/authenticate';

const router= express.Router()

router.post('/register',registerUser,loginUser) //post with body --> email & password
router.post('/login',loginUser)  //post with body --> email & password
router.get('/user',authenticateToken,getUser) //responds with json only when Status is OK

export default router