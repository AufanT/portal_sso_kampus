import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Register.css';


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        nim: '',
        status: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Password tidak cocok!');
            return;
        }

        setLoading(true);
        try {
            // Simulasi API call 
            console.log('Registering user:', formData);
            alert('Registrasi berhasil! Silakan login.');
            navigate('/login');
        } catch (error) {
            console.error('Register error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2 className='register-title'>Register</h2>
            <div className="register-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nama:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Konfirmasi Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className='tombol' type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>

                <p>
                    Sudah punya akun? <Link to="/login">Login di sini</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;