import { Signup, Signin, Users } from "../controllers/auth_controller.js"
import express from "express" 

const router = express.Router()

router.post("/signup", Signup)
router.post("/signin", Signin)
router.get("/users", Users)


export default router