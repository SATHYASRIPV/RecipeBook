// AddRecipeForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useAxiosInterceptor } from './useAxiosInterceptor';

export const AddRecipeForm = () => {
    useAxiosInterceptor()
    const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', procedure: '' })
    const [type,setType] = useState('')
    const [message, setMessage] = useState("")
    const [imagePreview, setImagePreview] = useState(null)

    const navigate = useNavigate()

    // const handleProfile = async (id) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const user_id = localStorage.getItem('user_id');
    //         await axios
    //             .get(`http://localhost:4000/profile/${id}`, {
    //                 headers: {
    //                     'authorization': `Bearer ${token}`,
    //                     'user_id': `${user_id}`
    //                 }
    //             })
    //             .then((res) => { 
    //                 console.log("Updated Successfully")
    //                 return res.data
    //             })
    //             .catch((err) => console.log(err))
            
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe({ ...newRecipe, [name]: value });
    }

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            const endpoint = type === 'veg' 
                ? "http://localhost:4000/addveg"
                : "http://localhost:4000/addnveg"

            await axios.post(endpoint, newRecipe, {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'user_id': `${user_id}`
                }
            })
            if (type === 'veg') {
                navigate("/veg-recipes")
            }
            else
            navigate("/non-veg-recipes")
            
            setMessage("Your recipe added successfully...")
            
            
        } catch (err) {
            console.error('Error adding recipe:', err);
            setMessage("There was an error adding your recipe.");
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewRecipe({
            ...newRecipe,
            image: file
        })
        setImagePreview(URL.createObjectURL(file));
    }

    return (
        <form onSubmit={handleSubmit} className="recipe-form">
            <div>
                <label htmlFor="type">Recipe Type:</label>
                <select 
                    id="type" 
                    name="type"
                    onChange={handleTypeChange}
                    value={type}
                    required
                >
                    <option value="">Select Type</option>
                    <option value="veg">Vegetarian</option>
                    <option value="nonveg">Non-Vegetarian</option>
                </select>
            </div>
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