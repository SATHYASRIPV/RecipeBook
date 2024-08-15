import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        alert('Feedback submitted: ' + feedback);
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
            <form onSubmit={submitHandler}>
                <textarea
                    placeholder="Enter your feedback"
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