// src/App.jsx
import React from 'react';

import ExpenseBox from './components/expenseBox';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Login from "./components/auth/login";
import Signup from './components/auth/signup';
import Stats from './components/stats';
import Help from './components/help';
import Profile from './components/profile';
import LandingPage from './components/LandingPage';
import MonthlyBudgetTracker from './components/MonthlyBudget';



function PrivateRoute({ children }) {
  const { token } = React.useContext(AuthContext); // ✅ Correct access
  return token ? children : <Navigate to="/login" />;
}

function App() {
  
  
  return (
    <AuthProvider>
      <BrowserRouter>
    
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/statistics" element={<Stats />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/monthlyBudget" element={<MonthlyBudgetTracker expenses />} />
          
          <Route
            path="/expenseBox"
            element={
              <PrivateRoute>
                <ExpenseBox />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
