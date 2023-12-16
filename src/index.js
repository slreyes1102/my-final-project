// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import App from './components/App';
import reportWebVitals from './reportWebVitals';

// Create a root for ReactDOM using react-dom/client
const root = createRoot(document.getElementById('root'));

// Render the App component
root.render(<App />);

// Measure and log web vitals
reportWebVitals();
