import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const navigate = useNavigate(); // Use useNavigate hook to access navigation function
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store the token in localStorage
                navigate(data.redirectUrl); // Redirect to the specified URL using navigate
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error occurred during authentication:', error);
        }
    };

    return (
        <div className="login-card">
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-3xl text-primary font-semibold">Sign in</h1>
                    <p className="mt-2 text-secondary">Enter your Email and Password to access your account</p>
                </div>
                <div className="mt-8">
                    <form onSubmit={handleSubmit}>
                        <div className="relative mt-8">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                className="peer input-box"
                                autoComplete="off"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="email"
                                className="input-label"
                            >
                                Email Address or Username
                            </label>
                        </div>
                        <div className="relative mt-8">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="peer input-box"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="password"
                                className="input-label"
                            >
                                Password
                            </label>
                        </div>
                        <div className="my-6">
                            <button
                                type="submit"
                                className="button"
                            >
                                Sign in
                            </button>
                        </div>
                        <p className="text-center text-sm text-secondary">
                            Don't have an account yet?{' '}
                            <a
                                href="#!"
                                className="font-semibold text-primary hover:underline focus:text-gray-dark focus:outline-none"
                            >
                                Contact to your GP
                            </a>
                            .
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
