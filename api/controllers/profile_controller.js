import User from '../models/auth_model.js'
import { VegRecipes, NonVegRecipes } from './recipe_controller.js'
import VegRecipe from '../models/veg_recipe_model.js'
import NvegRecipe from '../models/nonveg_recipe_model.js'

export const Profile = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const vegrecipes = await VegRecipe.find({ createdBy: userId })
        const nonvegrecipes = await NvegRecipe.find({ createdBy: userId })
        const details = {
            user: {
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            },
            recipes: {
                vegrecipes: vegrecipes.map(recipe => ({
                    id: recipe._id,
                    name: recipe.name,
                    ingredients: recipe.ingredients,
                    procedure: recipe.procedure,
                    createdAt: recipe.createdAt,
                    pic: recipe.pic,
                })),
                nvegrecipes: nonvegrecipes.map(recipe => ({
                    id: recipe._id,
                    name: recipe.name,
                    ingredients: recipe.ingredients,
                    procedure: recipe.procedure,
                    createdAt: recipe.createdAt,
                    pic: recipe.pic,
                }))
            }
        }
        res.status(200).json(details)

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' });
    }
}


