import { Profile } from "../controllers/profile_controller.js"
import { authenticateUser } from "../authentication.js"
import express from "express"

const router = express.Router()

router.get("/profile/:id", Profile, authenticateUser)

export default router

