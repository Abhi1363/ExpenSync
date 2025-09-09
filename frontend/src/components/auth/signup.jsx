import React, { useState } from "react";
import axios from '../../utils/axiosInstance';
import { useNavigate } from "react-router-dom";
import "./login.css";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Fill Details!");
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/auth/signup', { username, email, password });
      alert("User SignedUp Successfully!!");
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert("Signup failed! Check console for details.");
    }
  };

  return (
    <div className="background">
      <form className="Form" onSubmit={handleSubmit}>
        <h2>Create an account..!</h2>

        <input
          className="credentials"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="credentials"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="credentials"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="Button" type="submit" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
