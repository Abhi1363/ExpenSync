import React, { useState } from "react";
import axios from '../../utils/axiosInstance';
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { showError, showSuccess } from "../../utils/Toast";

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
      showSuccess("User Signed Up Successfully!");
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      showError("Signup failed! Please try again.");
    }
  };

  return (
    <div className="background">
      <form className="Form" onSubmit={handleSubmit}>
        <div className="brand">
          <i className="fa fa-user-plus logo-icon" aria-hidden="true"></i>
          <h2>Create Account</h2>
          <p className="subtitle">Join and start tracking your spending</p>
        </div>

        <div className="form-content">
          <label className="input-group">
            <i className="fa fa-user" aria-hidden="true"></i>
            <input
              className="credentials"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="input-group">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <input
              className="credentials"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input-group">
            <i className="fa fa-lock" aria-hidden="true"></i>
            <input
              type="password"
              className="credentials"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="Button primary" type="submit" >
            Create account
          </button>

          <div className="foot-note">
            Already have an account? <Link to="/login" style={{color:"#ffd166"}}>Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
