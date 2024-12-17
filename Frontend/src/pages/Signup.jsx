import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return alert('Name, email, and password are required');
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        alert(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        alert(details);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Signup error:', error);
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
        <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">Create Your Account</h1>
        <p className="text-gray-600 text-center mb-4">
          Sign up to get started.
        </p>
        <form className="flex flex-col gap-6" onSubmit={handleSignup}>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name"
              value={signupInfo.name}
              autoFocus
            />
          </div>
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
              value={signupInfo.email}
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
              value={signupInfo.password}
            />
          </div>
          <button
            className="bg-blue-500 text-white text-lg py-3 rounded-lg hover:bg-blue-700 transition-all"
            type="submit"
          >
            Signup
          </button>
          <p className="text-center text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
