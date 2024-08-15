import VegRecipe from "../models/veg_recipe_model.js"
import NvegRecipe from "../models/nonveg_recipe_model.js"


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

export const Remove = async(req,res) => {
    const recipeId = req.params;
    const recipe_user = req.headers['user_id']

    try {
        const recipee = VegRecipe.findById({ id: recipeId }).lean() || NvegRecipe.findById({ id: recipeId }).lean()
        console.log(recipee.schema.Schema.obj.createdBy)
        console.log(recipe_user)
        if (!recipee) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        if ((recipe_user) == (recipee)) {
            const recipe = await VegRecipe.findByIdAndDelete(recipeId) || NvegRecipe.findByIdAndDelete(recipeId)
            return res.status(200).json({ message: "Recipe removed successfully" })
        }
    

        else {
            return res.status(403).json({ message: "You are not authorized to remove this recipe" });
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

// export const Recipes = async (req, res) => {
//     try {
        
//     }
//     catch (err) {
        
//     }
// }

export const VegRecipes = async (req, res) => {
    try {
        const recipes = await VegRecipe.find({})
        res.status(200).json(recipes)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const NonVegRecipes = async (req, res) => {
    try {
        const recipes = await NvegRecipe.find({})
        res.status(200).json(recipes)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}