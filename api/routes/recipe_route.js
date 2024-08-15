import { AddVeg, AddNveg, Remove } from "../controllers/recipe_controller.js"
import express from "express" 
import { authenticateUser } from "../authentication.js"
import { VegRecipes, NonVegRecipes } from "../controllers/recipe_controller.js"

const router = express.Router()

router.post("/addveg", authenticateUser, AddVeg)
router.post("/addnveg",authenticateUser, AddNveg) 
router.delete("/remove/:id", authenticateUser, Remove)
router.get("/recipes/veg", authenticateUser, VegRecipes)
router.get("/recipes/non-veg", authenticateUser, NonVegRecipes)
// router.get("/recipes", Recipes) 


export default router