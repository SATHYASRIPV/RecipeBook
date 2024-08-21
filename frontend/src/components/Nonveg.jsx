import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useAxiosInterceptor } from './useAxiosInterceptor';

export const Nonveg = () => {
    useAxiosInterceptor()
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([])

    
        const fetchnvRecipes = async () => {
            const token = localStorage.getItem('token')
                const user_id = localStorage.getItem('user_id')
            try {
                const response = await axios.get('http://localhost:4000/recipes/non-veg', {
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'user_id': `${user_id}`
                    }
                });

                setRecipes(response.data);
            } catch (err) {
                console.log('Error fetching recipes:', err);
            }
        }
    
    
    useEffect(() => {
        fetchnvRecipes()
    }, [])



    const handleRemove = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            await axios
                .delete(`http://localhost:4000/removenveg/${id}`, {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'user_id': `${user_id}`
                }
            })
                .then((res) => {
                    console.log(res)
                    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id))
            })
                .catch((err) => {
                    console.log(err)
            })
            
            
        }
        catch (err) {
            console.log('Error removing recipe:', err);
            alert('Error removing recipe');
        }
    }

    return (
        <div>
            <header className="veg-header">
                <h1>Non-Veg Recipes</h1>
                <button className="addbutton" onClick={() => navigate('/addveg')}>Add Recipe</button>
            </header>
            <div className="content">
                <div className="recipe-list">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="recipe-item">
                            {recipe.pic && (
                                <img
                                    src={recipe.pic}
                                    alt={recipe.name}
                                    className="recipe-image"
                                />
                            )}
                            <button className="btn" onClick={() => handleRemove(recipe._id)}><i className="fa fa-close"></i>X</button>
                            <h3>{recipe.name}</h3>
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Procedure:</strong> {recipe.procedure}</p>
                            <p><strong>Created By:</strong></p>
                            <button onClick={()=>navigate("/profile",{state: {userid: recipe.createdBy}})}>
                             {recipe.user.username}</button><br></br>
                            <img
                                    src={recipe.user.avatar}
                                    alt={recipe.user.username}
                                    className="user-image"
                            />
                            <p>{ recipe.createdBy }</p>
                            <p align="right"><strong>Created At:</strong> {recipe.createdAt}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => navigate("/recipes")}>Back to Recipes</button>
        </div>
    );
};
