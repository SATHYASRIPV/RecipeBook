import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

export const Veg = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/recipes/veg', {
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'user_id': `${user_id}`
                    }
                })
                console.log(response.data)
                
                setRecipes(response.data)
            } catch (err) {
                console.log(err);
            }
        };
        fetchRecipes();
    }, [])

    const Recipe = ({ recipe }) => {
        handleRemove(recipe)
    }

    const handleRemove = async (recipe) => {
        const response = await axios.delete(`http://localhost/4000/remove/${recipe.id}`, {
            headers: {
                'authorization': `Bearer ${token}`,
                'user_id': `${user_id}`
            },
        })

        if (response.ok) {
            alert('Recipe removed successfully');
            setRecipes(recipes.filter((recipe) => recipe._id !== id));
        } else {
            alert('Error removing recipe');
        }
    }


    const addNewRecipe = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
    };

    return (
        <div>
            {/* <header className="home-header">
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/feedback">Feedback</Link></li>
                    </ul>
                    <h1>Veg Recipes</h1>
                    <button className="addbutton" onClick={() => navigate('/addveg', { state: { addNewRecipe } })}>
                        Add Recipe
                    </button>
                </nav>
            </header> */}
            <header className="veg-header">
                <h1>Veg Recipes</h1>
                <button className="addbutton" onClick={() => navigate('/addveg')}>Add Recipe</button>
            </header>
            {/* <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}><h1>{recipe.name}</h1></li>
                    
                ))}
            </ul> */}

            <div className="content">
                <div className="recipe-list">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="recipe-item">
                            {(
                                <img
                                    src={recipe.pic}
                            alt={recipe.name}
                            className="recipe-image"
                            />
                            )}
                            <button class="btn" onClick={()=>Recipe({recipe})}><i class="fa fa-close"></i>X</button>
                            <h3>{recipe.name}</h3>
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Procedure:</strong> {recipe.procedure}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};  