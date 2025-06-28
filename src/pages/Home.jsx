import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Home.css';

const Home = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="home-container">
            <h1>Welcome to Portal SSO Kampus</h1>

            {isAuthenticated ? (
                <div>
                 <Link to="/dashboard">Go to Dashboard</Link>
                </div>
            ) : (
                <div>
                    <p className='home-name'>Please login to access your dashboard</p>
                    <Link to="/login">Login</Link> <Link to="/register">Register</Link>
                </div>
            )}
        </div>
    );
};

export default Home; 