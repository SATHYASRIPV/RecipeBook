import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { Home } from './components/Home';
import Feedback from './components/Feedback';
import { Category } from './components/Category';
import { Veg } from './components/Veg';
import { Nonveg } from './components/Nonveg';
import { AddRecipeForm } from './components/Form';
import { Profile } from './components/Profile'
import { NotFound } from './components/NotFound';
import { Logout } from './components/Logout';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/recipes" element={<Category />} />
                    <Route path="/veg-recipes" element={<Veg />} />
                    <Route path="/non-veg-recipes" element={<Nonveg />} />
                    <Route path="/addveg" element={<AddRecipeForm />} />
                    <Route path="/addnveg" element={<AddRecipeForm />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/signout" element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;