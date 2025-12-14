import { authenticate } from './../middlewares/auth.middleware';
import express from "express"
import { login, profile, register } from "../controllers/auth.controller"
import { limiter } from '../middlewares/rate-limit.middleware';

const router = express.Router()

router.post('/register',limiter,register)
router.post('/login',limiter,login)
router.get('/me',authenticate(),profile)

export default router 