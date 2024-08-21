import express from "express" 
import { Feedback } from "../controllers/feedback_controller.js"
import { authenticateUser } from "../authentication.js"

const router = express.Router()

    router.post("/feedback/:id", authenticateUser, Feedback)

export default router