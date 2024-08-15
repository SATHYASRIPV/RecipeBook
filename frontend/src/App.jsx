import React from 'react';
import './App.css';
import { BrowserRouter, Form, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { Home } from './components/Home';
import Feedback from './components/Feedback';
import { Category } from './components/Category';
import { Veg } from './components/Veg';
import { Nonveg } from './components/Nonveg';
import { AddNRecipeForm, AddVRecipeForm } from './components/Form';

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
                    <Route path="/addveg" element={<AddVRecipeForm />} />
                    <Route path="/addnveg" element={<AddNRecipeForm />} />
                    
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;