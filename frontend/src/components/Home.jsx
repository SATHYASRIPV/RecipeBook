import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

export const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="home-container">
            <header className="home-header">
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/signin">Singin</Link></li>
                        <li><Link to="/feedback">Feedback</Link></li>
                    </ul>
                    <button onClick={() => navigate("/recipes")}>Recipes</button>
                    <button onClick={()=>navigate("/signout")}>Signout</button>
                </nav>
            </header>

            <section>
                <div className="content-section">
                <h1>Welcome to Recipe Book</h1>
                <p>Your ultimate destination for delicious recipes.</p>
                <h2>About Recipe Book</h2>
                </div>
                <div className="about-section">
                    
                    <p>
                        Recipe Book is your go-to source for diverse and delectable recipes from around the world. Whether you're a beginner in the kitchen or a seasoned chef, you'll find recipes that suit your taste and skill level.
                    </p>

                    <p>
                        Explore our extensive collection, save your favorite recipes, and share your own culinary creations with others.
                    </p>
                </div>

            </section>

            <div className="bottom-picture">
            <img src="noodle.jpg" alt="Decorative" />

            </div>

            <footer className="home-footer">
                <p>&copy; 2024 Recipe Book. All rights reserved.</p>
            </footer>
        </div>
    )
}