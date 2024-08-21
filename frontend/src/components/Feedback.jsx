import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { useAxiosInterceptor } from './useAxiosInterceptor';
import axios from 'axios';

const Feedback = () => {
    useAxiosInterceptor()
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const user_id = localStorage.getItem('user_id')
            await axios.post(`http://localhost:4000/feedback/${user_id}`, { feedback }, {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'user_id': `${user_id}`
                }
            }).then((res) => console.log(res))
                .catch((err) => console.log(err))
            alert('Feedback submitted')
        navigate("/")
        }
        catch (error) {
            console.log(error)
        }
        
    };

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
            
            <h2>Feedback</h2>
            <form onSubmit={submitHandler} className="recipe-form">
                <input
                    placeholder="Feed your Thoughts"
                    name='feedback'
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <footer className="home-footer">
                <p>&copy; 2024 Recipe Book. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Feedback;