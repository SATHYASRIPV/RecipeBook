import User from '../models/auth_model.js';
import { VegRecipes, NonVegRecipes } from './recipe_controller.js';

export const VegProfile = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).select('-password')

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const recipes = await VegRecipes.find({ addedBy: userId });

        res.status(200).json({
            user: {
                username: user.username,
                email: user.email
            },
            recipes: recipes.map(recipe => ({
                id: recipe._id,
                name: recipe.name,
                ingredients: recipe.ingredients,
                procedure: recipe.procedure,
                createdAt: recipe.createdAt
            }))
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' });
    }
}

export const NonvegProfile = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).select('-password')

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const recipes = await NonVegRecipes.find({ addedBy: userId });

        res.status(200).json({
            user: {
                username: user.username,
                email: user.email
            },
            recipes: recipes.map(recipe => ({
                id: recipe._id,
                name: recipe.name,
                ingredients: recipe.ingredients,
                procedure: recipe.procedure,
                createdAt: recipe.createdAt
            }))
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' });
    }
};

