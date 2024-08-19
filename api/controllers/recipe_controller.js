import VegRecipe from "../models/veg_recipe_model.js"
import NvegRecipe from "../models/nonveg_recipe_model.js"
import User from "../models/auth_model.js"

export const AddNveg = async (req, res) => {
    const { name, ingredients, procedure,  } = req.body
    try {
        const idHeader = req.headers['user_id']
        const newRecipe = new NvegRecipe({
            name,
            ingredients,
            procedure,
            createdBy:idHeader
        })
        await newRecipe.save()
        res.status(201).json({ message: "Non-Veg Recipe added successfully", recipe: newRecipe })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const AddVeg = async (req, res) => {
    const { name, ingredients, procedure,} = req.body
    try {
        const idHeader = req.headers['user_id']
        const newRecipe = new VegRecipe({
            name,
            ingredients,
            procedure,
            createdBy:idHeader
        })
        await newRecipe.save()
        res.status(201).json({ message: "Veg Recipe added successfully", recipe: newRecipe })
        
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const RemoveVeg = async(req,res) => {
    const recipeId = req.params.id;
    const recipe_user = req.headers['user_id']

    try {
        const rec = VegRecipe.find({ $and: [{ _id: { $eq: recipeId } }, { createdBy: { $eq: recipe_user } }] })
        if (!rec) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        else{
            const recipe = await VegRecipe.findByIdAndDelete(recipeId)
            if (recipe) return res.status(200).json({ message: "Recipe removed successfully" })

            else return res.status(403).json({ message: "You are not authorized to remove this recipe" }) 
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const RemoveNVeg = async(req,res) => {
    const recipeId = req.params.id;
    const recipe_user = req.headers['user_id']

    try {
        const rec = NvegRecipe.find({ $and: [{ _id: { $eq: recipeId } }, { createdBy: { $eq: recipe_user } }] })
        if (!rec) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        else{
            const recipe = await NvegRecipe.findByIdAndDelete(recipeId)
            if (!recipe) return res.status(200).json({ message: "Recipe removed successfully" })

            else return res.status(403).json({ message: "You are not authorized to remove this recipe" }) 
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const VegRecipes = async (req, res) => {
    try {
        const recipes = await VegRecipe.find({}).lean()
        const newrecipes = await Promise.all(recipes.map(async (recipe) => {
            const user = await User.findById(recipe.createdBy)

            if (user) {
                recipe.user = user
            } else {
                recipe.user = "None"
            }
            return recipe
        }))

        res.status(200).json(recipes)        
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const NonVegRecipes = async (req, res) => {
    try {
        const recipes = await NvegRecipe.find({}).lean()
        await Promise.all(recipes.map(async (recipe) => {
            const user = await User.findById(recipe.createdBy)

            if (user) {
                recipe.user = user
            } else {
                recipe.user = "None"
            }
            return recipe
        }))

        res.status(200).json(recipes)        
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}