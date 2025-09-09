import React, { useState, useContext } from "react";
import axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import "./login.css";

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
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });

      
      const { token, user } = response.data;
      console.log("User logging in:", user);

      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);

      login(token,user);

      alert('Login successful!');
      navigate('/expenseBox'); 
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <form className="Form" onSubmit={handleSubmit}>
        <div className="form-content">
          <h2>Hey Login Here...!</h2>

          <input
            className="credentials"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="credentials"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="Button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </button>

          <span style={{ marginTop: "20px" }}>
            Not Registered? <a href="/signup" style={{ color: "whitesmoke" }}>Sign Up</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
