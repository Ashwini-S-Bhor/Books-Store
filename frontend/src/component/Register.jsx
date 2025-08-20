import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleGoogleSignIn = () => {
    alert('Google login not implemented in JWT version');
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              {...register('name', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              placeholder="Full Name"
            />
            {errors.name && <p className="text-red-500 text-xs italic">Name is required</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              {...register('email', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="email"
              placeholder="Email Address"
            />
            {errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              {...register('password', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="password"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
          </div>

          {/* Error Message */}
          {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

          {/* Submit Button */}
          <div className="flex flex-wrap space-y-2.5 items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            <FaGoogle /> Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">
          &copy;2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
