// // VegRecipes.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export const Nonveg = () => {
//     const [recipes, setRecipes] = useState([])

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             try {
//                 const response = await axios.get("http://localhost:4000/recipes/non-veg")
//                 setRecipes(response.data);
//             } catch (err) {
//                 console.error('Error fetching recipes:', err)
//             }
//         };

//         fetchRecipes();
//     }, [])

//     return (
//         <div>
//             <h1>Non-Veg Recipes</h1>
//             <ul>
//                 {recipes.map((recipe) => (
//                     <li key={recipe._id}>{recipe.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };



import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export const Nonveg = () => {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:4000/recipes/non-veg", {
                    headers: { 'authorization': `Bearer ${token}` }
                    })
                console.log(response.data)
                setRecipes(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchRecipes()
    }, [])

    return (
        <div>
        <header className="veg-header">
                <h1>Non-Veg Recipes</h1>
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
                            <button class="btn"><i class="fa fa-close"></i>X</button>
                            <h3>{recipe.name}</h3>
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Procedure:</strong> {recipe.procedure}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

