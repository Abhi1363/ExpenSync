import React, { useState, useEffect } from 'react'
import './nav.css'
import axiosInstance from '../utils/axiosInstance'

const Nav = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axiosInstance
      .get('/userInfo')
      .then((res) => setProfile(res.data))
      .catch((err) => console.error('Error fetching profile for nav:', err));
  }, []);

  return (
    <div className='navbar'>
      <h2>Hello, {profile.username || 'User'}👋</h2>
      <p>Here's your financial overview!</p>
    </div>
  )
}

export default Nav
