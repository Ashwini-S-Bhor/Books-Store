import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import getBaseUrl from'../utils/baseUrl';
const Login = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${getBaseUrl()}/api/auth/login`, {
        email: data.email,
        password: data.password,
      });

      const { token, user } = res.data;

      // Save user token & info
      localStorage.setItem('userToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error(error);
      setMessage('Invalid email or password');
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center relative flex justify-center items-center"
      style={{ backgroundImage: "url('../public/UserLogin.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Glassmorphism box */}
      <div className="relative w-full max-w-sm mx-auto rounded-2xl shadow-xl 
                      backdrop-blur-md bg-white/20 border border-white/30 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">User Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Email
            </label>
            <input
              {...register('email', { required: true })}
              className="w-full px-3 py-2 rounded-lg bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-400 text-xs italic">Email is required</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
              Password
            </label>
            <input
              {...register('password', { required: true })}
              className="w-full px-3 py-2 rounded-lg bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-400 text-xs italic">Password is required</p>
            )}
          </div>

          {/* Error Message */}
          {message && (
            <p className="text-red-400 text-xs italic mb-3">{message}</p>
          )}

          {/* Submit Button */}
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-sm text-center text-gray-200">
          Haven't an account?{' '}
          <Link to="/register" className="text-blue-300 hover:text-blue-500">
            Register
          </Link>
        </p>

        <p className="mt-5 text-center text-gray-400 text-xs">
          &copy;2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
