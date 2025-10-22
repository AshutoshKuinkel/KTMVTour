import express from "express"
import { login, profile, register } from "../controllers/auth.controller"

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/me',profile)

export default router