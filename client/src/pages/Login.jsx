import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [gradientPosition, setGradientPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      if (response.data.message === 'Login successful') {
        navigate('/');
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-950 via-blue-900 to-black"
        style={{
          backgroundSize: "200% 200%",
          backgroundPosition: `${gradientPosition}% ${gradientPosition}%`,
          transition: "background-position 0.5s ease-in-out",
        }}
      ></div>
      
      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          <p className="mt-4 text-gray-600">Already have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
        </form>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;