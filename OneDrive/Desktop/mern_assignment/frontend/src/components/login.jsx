// src/components/LoginPage.js
import React, { useState } from 'react';
import Admin from './Admin';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform your authentication here (e.g., API call)
    // For demonstration, we'll assume the credentials are valid if they are not empty
    if (username && password) {
      // Store credentials in localStorage (for demonstration purposes)
      localStorage.setItem('user', JSON.stringify({ username}));

      // Redirect to the main page
      navigate('/Admin');
    } else {
      setError('Please enter both username and password.');
    }
  };


  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="font-semibold text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="font-semibold text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
