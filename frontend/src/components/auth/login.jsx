import React, { useState, useContext } from "react";
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import "./login.css";
import { showError, showSuccess } from "../../utils/Toast";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', { email, password });

      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);

      login(token,user);
     showSuccess("Login successful!");
      navigate('/expenseBox'); 
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      showError("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <form className="Form" onSubmit={handleSubmit}>
        <div className="brand">
          <i className="fa fa-piggy-bank logo-icon" aria-hidden="true"></i>
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to manage your expenses</p>
        </div>

        <div className="form-content">
          <label className="input-group">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <input
              className="credentials"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="input-group">
            <i className="fa fa-lock" aria-hidden="true"></i>
            <input
              className="credentials"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

         

          <button className="Button primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </button>

          <div className="foot-note" >
            Don't have an account? <Link to="/signup" style={{color:"#ffd166"}}>Create one</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
