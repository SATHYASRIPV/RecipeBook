import { useAxiosInterceptor } from './useAxiosInterceptor'
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Profile = () => {
          const navigate = useNavigate()
          const [recipes, setRecipes] = useState([]);

        useAxiosInterceptor()
        const { state } = useLocation()
        const { details } = state || {}
        
        
        const handleRemoveveg = async (id) => {
          const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
          if (!confirmDelete) return;

          try {
            const token = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            await axios
              .delete(`http://localhost:4000/removeveg/${id}`, {
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
  
  const handleRemovenveg = async (id) => {
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

        const user = details.user
        const [vegRecipes, setVegRecipes] = useState([])
        const [nonVegRecipes, setNonVegRecipes] = useState([])
              
        useEffect(() => {
          setVegRecipes(details?.recipes?.vegrecipes || [])
        setNonVegRecipes(details?.recipes?.nonvegrecipes || [])
    }, [])

        return (
          <div className="profile-view">
            <div className="user-info">
              <img src={user.avatar} alt={user.username} className="profile-pic" />
              <h1>{user.username}</h1>
            </div>
            <h1>Veg Recipes</h1>
            <div className="content">
                      <div className="recipe-list">
                          {vegRecipes.map((recipe, index) => (
                              <div key={index} className="recipe-item">
                                  {recipe.pic && (
                                      <img
                                          src={recipe.pic}
                                          alt={recipe.name}
                                          className="recipe-image"
                                      />
                                  )}
                                  <button className="btn" onClick={() => handleRemoveveg(recipe.id)}><i className="fa fa-close"></i>X</button>
                                  <h3>{recipe.name}</h3>
                                  <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                  <p><strong>Procedure:</strong> {recipe.procedure}</p>
                              <p><strong>Created By:</strong> {user.username}</p>
                              <p align="right"><strong>Created At:</strong> {recipe.createdAt}</p>
                              </div>
                          ))}
                      </div>
            </div>
            <h1>Non Veg Recipes</h1>
            <div className="content">
              <div className="recipe-list">
                          {nonVegRecipes.map((recipe, index) => (
                              <div key={index} className="recipe-item">
                                  {recipe.pic && (
                                      <img
                                          src={recipe.pic}
                                          alt={recipe.name}
                                          className="recipe-image"
                                      />
                                  )}
                                  <button className="btn" onClick={() => handleRemovenveg(recipe._id)}><i className="fa fa-close"></i>X</button>
                                  <h3>{recipe.name}</h3>
                                  <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                  <p><strong>Procedure:</strong> {recipe.procedure}</p>
                              <p><strong>Created By:</strong> {user.username}</p>
                              <p align="right"><strong>Created At:</strong> {recipe.createdAt}</p>
                              </div>
                          ))}
                      </div>
            </div>
            <button onClick={() => navigate(-1)}>BACK</button>
          </div>
        )
      }