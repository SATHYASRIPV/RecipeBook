import React from 'react';
import './styles.css';
import { Link,useNavigate } from 'react-router-dom'

export const Category = () => {
    const navigate = useNavigate();
    return (
        <div>
            <header className="home-header">
                {/* <h1><b><u>Recipe Hub</u></b></h1> */}
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/feedback">Feedback</Link></li>
                    </ul>
                </nav>
            </header>

            <div className="content">
                <h2><b>Select Recipe Type</b></h2>
                <div className="categories">
                    <div className="category" onClick={()=>navigate("/veg-recipes")}>
                        <img className='img1' src="veg.jpg" alt="Vegetarian" />
                        <h3>Vegetarian</h3>
                    </div>

                    <div className="category" onClick={()=>navigate("/non-veg-recipes")}>
                        <img className='img2' src="non-veg.jpg" alt="Non-Vegetarian" />
                        <h3>Non-Vegetarian</h3>
                    </div>
                </div>
            </div>

            <footer className="home-footer">
                <p>&copy; 2024 Recipe Book. All rights reserved.</p>
            </footer>
        </div>
    );
};