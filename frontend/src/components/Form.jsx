// AddRecipeForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export const AddVRecipeForm = () => {
    const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', procedure: '' })
    const [message, setMessage] = useState("")
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe({ ...newRecipe, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const token = localStorage.getItem('token')
            const user_id = localStorage.getItem('user_id')

            await axios.post("http://localhost:4000/addveg", newRecipe, {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'user_id': `${user_id}`
                }
            })
            
            setMessage("Your Recipe added successfully...")
            // localStorage.setItem('recipe_id', newRecipe.id)
            navigate(-1)

        } catch (err) {
            console.error('Error adding recipe:', err)
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewRecipe({
            ...newRecipe,
            image: file
        });
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <form onSubmit={handleSubmit} className="recipe-form">
            <div>
                <label htmlFor="name">Recipe Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={newRecipe.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="ingredients">Ingredients:</label>
                <textarea
                    id="ingredients"
                    name="ingredients"
                    value={newRecipe.ingredients}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="procedure">Procedure:</label>
                <textarea
                    id="procedure"
                    name="procedure"
                    value={newRecipe.procedure}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
            <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                    </div>
                )}
            </div>
            <button type="submit">Add Recipe</button>
        </form>
    )
}

export const AddNRecipeForm = () => {
    const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', procedure: '' })
    const [message, setMessage] = useState("")
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe({ ...newRecipe, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const token = localStorage.getItem('token')
            const user_id = localStorage.getItem('user_id')

            await axios.post("http://localhost:4000/addnveg", newRecipe, {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'user_id': `${user_id}`
                }
            })
            
            setMessage("Your Recipe added successfully...")
            // localStorage.setItem('recipe_id', newRecipe.id)
            navigate(-1)

        } catch (err) {
            console.error('Error adding recipe:', err)
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewRecipe({
            ...newRecipe,
            image: file
        });
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <form onSubmit={handleSubmit} className="recipe-form">
            <div>
                <label htmlFor="name">Recipe Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={newRecipe.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="ingredients">Ingredients:</label>
                <textarea
                    id="ingredients"
                    name="ingredients"
                    value={newRecipe.ingredients}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="procedure">Procedure:</label>
                <textarea
                    id="procedure"
                    name="procedure"
                    value={newRecipe.procedure}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
            <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                    </div>
                )}
            </div>
            <button type="submit">Add Recipe</button>
        </form>
    );
};