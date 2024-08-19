import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAxiosInterceptor = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response, 
            error => {
                if (error.response && error.response.status === 401) {
                    // Token expired, handle logout
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_id');
                    
                    // Redirect to login page
                    navigate('/signin');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    return null;  // No UI component is returned
};

// export default useAxiosInterceptor