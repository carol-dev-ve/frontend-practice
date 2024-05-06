import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login, user} = useAuth();

  const handleUsernameChange  = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can add your login logic
    console.log('Username:', username);
    console.log('Password:', password);
    if(!username || !password) {
      //error
    } 
    try{
      const {data} = await axios.post('https://dummyjson.com/auth/login', {
          username,
          password,
          expiresInMins: 30, // optional, defaults to 60
      })
      console.log(data)
      //Set User in Context
      login(data)

    }catch(error){
      console.log(error)
    }

    // Reset form fields after submission
    setUsername('');
    setPassword('');
  };

  if(user?.email) return <Navigate to="/data" replace />
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-600 mb-1">Username</label>
            <input
              type="text"
              id="username"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          <p className="text-gray-600">Don't have an account?</p>
          <a href="/register" className="text-blue-500 hover:underline">Sign up here</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;