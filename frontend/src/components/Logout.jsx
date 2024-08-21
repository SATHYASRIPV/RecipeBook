import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const signOut = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.clear();
            sessionStorage.clear();
            navigate('/signin')
        };

        signOut()
    }, [navigate])

    return (
        <div>
            Logging out...
        </div>
    );
};