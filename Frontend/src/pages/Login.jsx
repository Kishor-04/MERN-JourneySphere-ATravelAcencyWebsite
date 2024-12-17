import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import apiurl from '../lib/urls'


function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return alert('Email and password are required');
    }

    try {
      const response = await fetch(`${apiurl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        alert(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        alert(details);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1664368832311-7fe635e32c7c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fHww")',
      }}
    >
      <div className="flex flex-col bg-white py-10 px-12 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">Welcome Back</h1>
        <p className="text-gray-600 text-center mb-4">
          Please login to your account.
        </p>
        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginInfo.email}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginInfo.password}
            />
          </div>
          <button
            className="bg-blue-500 text-white text-lg py-3 rounded-lg hover:bg-blue-700 transition-all"
            type="submit"
          >
            Login
          </button>
          <p className="text-center text-gray-700">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
