import { Signup, Signin, Users } from "../controllers/auth_controller.js"
import express from "express" 
import {authenticateUser} from "../authentication.js"
const router = express.Router()

router.post("/signup", Signup)
router.post("/signin", Signin)
// authenticateUser
router.get("/users", Users)

export default router