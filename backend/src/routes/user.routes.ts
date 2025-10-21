import express from "express"
import { updateProfile } from "../controllers/user.controller"

const router = express.Router()

router.put('/updateProfile',updateProfile)

export default router