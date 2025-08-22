// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImg from "../../public/adminlogin.jpg"; // ✅ Your background image
import baseUrl from'../utils/baseUrl'
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(
        `${getBaseUrl()}/api/admin/login`,
        { email, password }
      );

      // Save admin token & role
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminRole", data.user.role);

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setError("You are not authorized to access the admin panel.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/adminlogin.jpg')` }}
    >
      {/* Glassmorphism Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Admin Login
        </h2>

        {error && (
          <p className="bg-red-500/80 text-white p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium text-white drop-shadow">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-white/40 bg-white/20 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-200"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-white drop-shadow">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-white/40 bg-white/20 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-200"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
