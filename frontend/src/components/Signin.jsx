import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import './styles.css'
import { useAxiosInterceptor } from './useAxiosInterceptor';

const Signin = () => {
    useAxiosInterceptor()
    const [data, setData] = useState({ email: "", password: "" })
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:4000/signin", data)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user_id', res.data.user._id)
            setMessage('Sign In successful')
            navigate("/recipes")
        }
        catch (error) {
            setMessage(error.response?.data?.message || 'Sign In failed')
            console.log(error)
        }
    }
    

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
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
            <h2>Sign In</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={submitHandler}>
                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <p align="left">Don't have an account? <Link to="/signup" className="link">Sign Up</Link></p>
            <footer className="home-footer">
                <p>&copy; 2024 Recipe Book. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Signin;