import auth_route from "./routes/auth_route.js"
import recipe_route from "./routes/recipe_route.js"
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import { authenticateUser } from "./authentication.js"
import dotenv from "dotenv";

const app = express()
dotenv.config();
const port = 4000;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use(authenticateUser())
mongoose.connect("mongodb+srv://sathyasripv:recipe@recipeuser.mpmkx.mongodb.net/demo?retryWrites=true&w=majority&appName=RecipeUser")
.then(() => {
    console.log("Database Connected")
     })
.catch((err) => {
    console.log(err.message)
})

app.get("/", (req, res) => {
    res.send("Hello SathyaSri");
});

app.use("/", auth_route)
app.use("/",recipe_route)

app.listen(port, (error) => {
    if(error) throw error
    console.log(`Server running at http://localhost:${port}`);
});