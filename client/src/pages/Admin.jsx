import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/cookieUtils.js'; // Utility to get cookies

const Admin = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = getCookie('role'); // Get the role from the cookie
    if (role !== 'admin') {
      navigate('/'); // Redirect to home if not an admin
      return;
    }
  });

  return (
    <div>
      <h2>Admin Page</h2>
      <p>{message}</p>
    </div>
  );
};

export default Admin;