import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import './styles.css'; // Import the CSS file

const Signup = () => {
    const [data, setData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/signup",data)
            console.log(response.data)
            setMessage('Registration successful');
            Navigate("/signin")
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <header className="home-header">
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/feedback">Feedback</Link></li>
                    </ul>
                </nav>
            </header>
            <h2>Sign Up</h2>
            {message && <p>{message}</p>}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={data.username}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/signin">Sign In</Link></p>
            <footer className="home-footer">
                <p>&copy; 2024 Recipe Book. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Signup;