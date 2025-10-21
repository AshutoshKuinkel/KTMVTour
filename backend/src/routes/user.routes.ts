import { authenticate } from './../middlewares/auth.middleware';
import express from "express"
import { updateProfile } from "../controllers/user.controller"

const router = express.Router()

router.put('/updateProfile',authenticate(),updateProfile)

export default router