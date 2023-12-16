import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Form from './Form';
import Dashboard from './Dashboard';
import Login from './Login';
import Homepage from './Homepage';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [navigateToDashboard, setNavigateToDashboard] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleLogin = (username, password) => {
    if (username && password) {
      setLoggedIn(true);
    }
  };
  // Assuming you have some form submissions data
  const [formSubmissions, setFormSubmissions] = useState([]);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setNavigateToDashboard(true);
    // Optionally, you can save the form data in state for other purposes
    setFormSubmissions((prevSubmissions) => [...prevSubmissions, data]);
    // Show a pop-up or notification here (you can use react-toastify or any other library)
    toast.success('Form data submitted successfully!', { position: toast.POSITION.TOP_RIGHT });
  }; 

  return (
    <Router>
      <div className="App">
        <h1>Communication Tracker</h1>
        <ul>
          <li>
            <Link to="/homepage">Homepage</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/form">Form</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route
            path="/form"
            element={
              isLoggedIn ? (
                <Form onFormSubmit={handleFormSubmit} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
          <Dashboard formSubmissions={formSubmissions} />
            ) : (
         <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
